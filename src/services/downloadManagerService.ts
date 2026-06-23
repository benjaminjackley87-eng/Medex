import { DownloadTask, DownloadTaskStatus, Examination, ExamStep } from '../types';
import { GeminiService } from './geminiService';
import { storage } from './storageService';
import { EXAMINATIONS } from '../constants';

export class DownloadManagerService {
  private tasks: DownloadTask[] = [];
  private isPaused: boolean = false;
  private maxConcurrency: number = 1;
  private activeCount: number = 0;
  private listeners: Set<(tasks: DownloadTask[]) => void> = new Set();
  private gemini = new GeminiService();

  constructor() {
    const saved = localStorage.getItem('medex_download_queue');
    if (saved) {
      this.tasks = (JSON.parse(saved) as DownloadTask[]).map((t) => ({
        ...t,
        status: t.status === 'downloading' || t.status === 'pending' ? 'pending' : t.status
      }));
    }
    this.processQueue();
  }

  private notify() {
    localStorage.setItem('medex_download_queue', JSON.stringify(this.tasks));
    this.listeners.forEach((l) => l([...this.tasks]));
  }

  subscribe(listener: (tasks: DownloadTask[]) => void) {
    this.listeners.add(listener);
    listener([...this.tasks]);
    return () => this.listeners.delete(listener);
  }

  async downloadAll() {
    const allDownloaded = await storage.getAllDownloaded();
    const downloadedIds = new Set(
      allDownloaded.filter((e) => e.steps && e.steps.length > 0).map((e) => e.id)
    );

    const toDownload = EXAMINATIONS.filter(
      (exam) =>
        !downloadedIds.has(exam.id) &&
        !this.tasks.find((t) => t.examId === exam.id && t.status !== 'failed')
    );

    // Treat drafts and empty protocols as priority
    toDownload.sort((a, b) => {
      const aIsPriority = a.isDraft || a.steps.length === 0;
      const bIsPriority = b.isDraft || b.steps.length === 0;
      if (aIsPriority && !bIsPriority) return -1;
      if (!aIsPriority && bIsPriority) return 1;
      return 0;
    });

    toDownload.forEach((exam) => {
      this.addTask(exam.id);
    });
  }

  retryTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = 'pending';
      task.error = undefined;
      task.retryCount = 0;
      this.notify();
      this.processQueue();
    }
  }

  async clearArchive() {
    if (
      !confirm(
        'Are you sure you want to purge the Knowledge Vault? This will delete all persistent offline files.'
      )
    )
      return;
    await storage.clearArchive();
    this.tasks = [];
    this.notify();
    window.location.reload();
  }

  addTask(examId: string, type: DownloadTask['type'] = 'deep_sync') {
    const exam = EXAMINATIONS.find((e) => e.id === examId);
    if (!exam) return;

    const existing = this.tasks.find((t) => t.examId === examId && t.status !== 'completed');
    if (existing) return;

    const newTask: DownloadTask = {
      id: Math.random().toString(36).substr(2, 9),
      examId,
      examName: exam.name,
      type,
      status: 'pending',
      progress: 0,
      retryCount: 0,
      createdAt: Date.now()
    };

    this.tasks = [...this.tasks, newTask];
    this.notify();
    this.processQueue();
  }

  private async processQueue() {
    if (this.isPaused || this.activeCount >= this.maxConcurrency) return;

    const nextTask = this.tasks.find((t) => t.status === 'pending');
    if (!nextTask) return;

    this.activeCount++;
    await this.runTask(nextTask);
    this.activeCount--;
    this.processQueue();
  }

  private async fetchAndStoreAsset(url: string, prefix: string): Promise<string | undefined> {
    try {
      const assetId = `${prefix}_${Math.random().toString(36).substr(2, 5)}`;
      const localUrl = await storage.saveAsset(assetId, url);
      return localUrl;
    } catch (e) {
      console.warn(`Asset fetch/store failed: ${url}`, e);
      return undefined;
    }
  }

  async reacquireAsset(examId: string, assetId: string, prompt?: string) {
    const task = this.tasks.find((t) => t.examId === examId);
    if (task) {
      task.status = 'downloading';
      task.error = 'Re-acquiring asset...';
      this.notify();
    }

    try {
      let newUrl: string | undefined;
      if (prompt) {
        newUrl = await this.gemini.generateIllustration(prompt, false);
      }

      if (newUrl) {
        const localUrl = await storage.saveAsset(assetId, newUrl);
        // Update the examination in storage
        const exam = await storage.getExamination(examId);
        if (exam) {
          // Deep search and replace the localUrl
          const updated = this.replaceAssetInExam(exam, assetId, localUrl || '');
          await storage.saveExamination(updated);
        }
      }
    } catch (e) {
      console.error('Re-acquisition failed', e);
    } finally {
      if (task) {
        task.status = 'completed';
        task.error = undefined;
        this.notify();
      }
    }
  }

  private replaceAssetInExam(exam: Examination, assetId: string, newUrl: string): Examination {
    const updated = { ...exam };
    if (updated.localHeaderImageUrl === assetId) updated.localHeaderImageUrl = newUrl;

    updated.steps = updated.steps.map((step) => {
      const newStep = { ...step };
      if (newStep.localImageUrl === assetId) newStep.localImageUrl = newUrl;
      if (newStep.positiveFindings) {
        newStep.positiveFindings = newStep.positiveFindings.map((pf) => {
          if (pf.localImageUrl === assetId) return { ...pf, localImageUrl: newUrl };
          return pf;
        });
      }
      return newStep;
    });

    return updated;
  }

  private async runTask(task: DownloadTask) {
    task.status = 'downloading';
    task.progress = 5;
    this.notify();

    try {
      const baseExam = EXAMINATIONS.find((e) => e.id === task.examId);
      if (!baseExam) throw new Error('Exam definition not found');

      // STAGE 1: PROTOCOL SYNTHESIS
      task.progress = 15;
      task.error = 'Synthesizing Protocol Structure...';
      this.notify();
      const populated = await this.gemini.populateExamination(baseExam);

      // STAGE 2: ASSET SERIALIZATION
      task.progress = 40;
      task.error = 'Archiving Visual Stigmata to Vault...';
      this.notify();

      let headerAssetId: string | undefined;
      if (populated.headerImageUrl) {
        headerAssetId = await this.fetchAndStoreAsset(
          populated.headerImageUrl,
          `header_${task.examId}`
        );
      }

      const processedSteps: ExamStep[] = [];
      const steps = populated.steps || [];

      for (let idx = 0; idx < steps.length; idx++) {
        const step = steps[idx];
        const stepProgress = 40 + Math.floor((idx / steps.length) * 50);
        if (task.progress < stepProgress) {
          task.progress = stepProgress;
          this.notify();
        }

        const processedStep = { ...step };
        let activeImageUrl = step.imageUrl;

        if (!activeImageUrl && step.imagePrompt) {
          try {
            activeImageUrl = await this.gemini.generateIllustration(step.imagePrompt, false);
          } catch (e) {
            console.warn(`Transient image generation error for step: ${step.title}`);
          }
        }

        if (activeImageUrl) {
          processedStep.localImageUrl = await this.fetchAndStoreAsset(
            activeImageUrl,
            `step_${step.id}`
          );
        }

        if (step.positiveFindings) {
          const processedFindings = [];
          for (let pfIdx = 0; pfIdx < step.positiveFindings.length; pfIdx++) {
            const pf = step.positiveFindings[pfIdx];
            if (pf.imageUrl) {
              const pfAssetId = await this.fetchAndStoreAsset(
                pf.imageUrl,
                `finding_${step.id}_${pfIdx}`
              );
              processedFindings.push({ ...pf, localImageUrl: pfAssetId });
            } else {
              processedFindings.push(pf);
            }
          }
          processedStep.positiveFindings = processedFindings;
        }
        processedSteps.push(processedStep);
      }

      const finalExam: Examination = {
        ...baseExam,
        ...populated,
        steps: processedSteps,
        headerImageUrl: populated.headerImageUrl,
        localHeaderImageUrl: headerAssetId,
        isDownloaded: true,
        isDraft: false,
        sources: [...(baseExam.sources || []), ...(populated.sources || [])]
      };

      await storage.saveExamination(finalExam);
      task.status = 'completed';
      task.progress = 100;
      task.error = undefined;
    } catch (err: unknown) {
      console.error('Download pipeline failure', err);
      task.status = 'failed';
      const errorMessage = err instanceof Error ? err.message : String(err);
      const isQuotaError = errorMessage.includes('429') || (typeof err === 'object' && err !== null && 'status' in err && (err as { status?: number }).status === 429);
      if (isQuotaError) {
        this.isPaused = true;
        task.error = 'Quota Exceeded - Sync Paused';
      } else {
        task.error = errorMessage || 'Download Failed';
      }
    } finally {
      this.notify();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) this.processQueue();
    this.notify();
  }
  cancelTask(taskId: string) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.notify();
    this.processQueue();
  }
  getTasks() {
    return [...this.tasks];
  }
  getPauseState() {
    return this.isPaused;
  }
}

export const downloadManager = new DownloadManagerService();
