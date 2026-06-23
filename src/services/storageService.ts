import {
  Examination,
  ECGPattern,
  RadiologyFinding,
  AppTheme,
  TherapeuticGuidance,
  ClinicalCorrelation,
  PathogenInfo,
  AntibioticInfo,
  DifferentialSynthesis,
  AnaesthesiaDrug
} from '../types';

const DB_NAME = 'MedExLibraryDB';
const DB_VERSION = 9; // Incremented for anaesthesia drugs
const EXAM_STORE = 'examinations';
const ASSET_STORE = 'assets';
const ECG_STORE = 'ecg_patterns';
const RADIOLOGY_STORE = 'radiology_findings';
const THEME_STORE = 'app_theme';
const PROTOCOL_STORE = 'management_protocols';
const CORRELATION_STORE = 'clinical_correlations';
const PATHOGEN_STORE = 'pathogens';
const ANTIBIOTIC_STORE = 'antibiotics';
const SYNTHESIS_STORE = 'differential_synthesis';
const STUDY_PROGRESS_STORE = 'study_progress';
const EXAM_SESSION_STORE = 'exam_sessions';
const ANAESTHESIA_DRUG_STORE = 'anaesthesia_drugs';

export class StorageService {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;
  private objectUrls: Map<string, string> = new Map();

  async init(): Promise<void> {
    if (this.db) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => {
        this.initPromise = null;
        reject('Failed to open IndexedDB');
      };
      request.onsuccess = () => {
        this.db = request.result;
        this.initPromise = null;
        resolve();
      };
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(EXAM_STORE)) {
          db.createObjectStore(EXAM_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(ASSET_STORE)) {
          db.createObjectStore(ASSET_STORE);
        }
        if (!db.objectStoreNames.contains(ECG_STORE)) {
          db.createObjectStore(ECG_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(RADIOLOGY_STORE)) {
          db.createObjectStore(RADIOLOGY_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(THEME_STORE)) {
          db.createObjectStore(THEME_STORE);
        }
        if (!db.objectStoreNames.contains(PROTOCOL_STORE)) {
          db.createObjectStore(PROTOCOL_STORE, { keyPath: 'condition' });
        }
        if (!db.objectStoreNames.contains(CORRELATION_STORE)) {
          db.createObjectStore(CORRELATION_STORE, { keyPath: 'sign' });
        }
        if (!db.objectStoreNames.contains(PATHOGEN_STORE)) {
          db.createObjectStore(PATHOGEN_STORE, { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains(ANTIBIOTIC_STORE)) {
          db.createObjectStore(ANTIBIOTIC_STORE, { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains(SYNTHESIS_STORE)) {
          db.createObjectStore(SYNTHESIS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STUDY_PROGRESS_STORE)) {
          db.createObjectStore(STUDY_PROGRESS_STORE, { keyPath: 'topic' });
        }
        if (!db.objectStoreNames.contains(EXAM_SESSION_STORE)) {
          db.createObjectStore(EXAM_SESSION_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(ANAESTHESIA_DRUG_STORE)) {
          db.createObjectStore(ANAESTHESIA_DRUG_STORE, { keyPath: 'name' });
        }
      };
    });

    return this.initPromise;
  }

  async saveExamination(exam: Examination): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_STORE], 'readwrite');
      const store = transaction.objectStore(EXAM_STORE);
      const downloadData = { ...exam, isDownloaded: true, lastUpdated: Date.now() };
      const request = store.put(downloadData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save examination');
    });
  }

  async saveAsset(id: string, data: Blob | string): Promise<string | undefined> {
    if (data instanceof Blob) {
      await this.init();
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([ASSET_STORE], 'readwrite');
        const store = transaction.objectStore(ASSET_STORE);
        const request = store.put(data, id);
        request.onsuccess = () => resolve(id);
        request.onerror = () => reject('Failed to save asset');
      });
    }
    return undefined;
  }

  async getAssetUrl(id: string): Promise<string | null> {
    // If it's a server path, return it directly
    if (id.startsWith('/storage/assets/')) return id;

    if (this.objectUrls.has(id)) return this.objectUrls.get(id)!;

    await this.init();
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([ASSET_STORE], 'readonly');
      const store = transaction.objectStore(ASSET_STORE);
      const request = store.get(id);
      request.onsuccess = () => {
        if (request.result instanceof Blob) {
          const url = URL.createObjectURL(request.result);
          this.objectUrls.set(id, url);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  }

  async getExamination(id: string): Promise<Examination | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_STORE], 'readonly');
      const store = transaction.objectStore(EXAM_STORE);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch examination');
    });
  }

  async updateLearningStatus(id: string, status: any): Promise<void> {
    await this.init();
    const exam = await this.getExamination(id);
    if (!exam) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_STORE], 'readwrite');
      const store = transaction.objectStore(EXAM_STORE);
      const updatedExam = { ...exam, learningStatus: status };
      const request = store.put(updatedExam);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to update learning status');
    });
  }

  async getAllDownloaded(): Promise<Examination[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_STORE], 'readonly');
      const store = transaction.objectStore(EXAM_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to fetch all examinations');
    });
  }

  async saveECGPattern(pattern: ECGPattern): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ECG_STORE], 'readwrite');
      const store = transaction.objectStore(ECG_STORE);
      const request = store.put(pattern);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save ECG pattern');
    });
  }

  async getAllECGPatterns(): Promise<ECGPattern[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ECG_STORE], 'readonly');
      const store = transaction.objectStore(ECG_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to fetch ECG patterns');
    });
  }

  async saveRadiologyFinding(finding: RadiologyFinding): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RADIOLOGY_STORE], 'readwrite');
      const store = transaction.objectStore(RADIOLOGY_STORE);
      const request = store.put(finding);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save radiology finding');
    });
  }

  async getAllRadiologyFindings(): Promise<RadiologyFinding[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RADIOLOGY_STORE], 'readonly');
      const store = transaction.objectStore(RADIOLOGY_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to fetch radiology findings');
    });
  }

  async saveTheme(theme: AppTheme): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([THEME_STORE], 'readwrite');
      const store = transaction.objectStore(THEME_STORE);
      const request = store.put(theme, 'current');
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save theme');
    });
  }

  async getTheme(): Promise<AppTheme | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([THEME_STORE], 'readonly');
      const store = transaction.objectStore(THEME_STORE);
      const request = store.get('current');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch theme');
    });
  }

  async saveProtocol(protocol: TherapeuticGuidance): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PROTOCOL_STORE], 'readwrite');
      const store = transaction.objectStore(PROTOCOL_STORE);
      const request = store.put(protocol);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save protocol');
    });
  }

  async getProtocol(condition: string): Promise<TherapeuticGuidance | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PROTOCOL_STORE], 'readonly');
      const store = transaction.objectStore(PROTOCOL_STORE);
      const request = store.get(condition);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch protocol');
    });
  }

  async saveCorrelation(correlation: ClinicalCorrelation): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CORRELATION_STORE], 'readwrite');
      const store = transaction.objectStore(CORRELATION_STORE);
      const request = store.put(correlation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save correlation');
    });
  }

  async getCorrelation(sign: string): Promise<ClinicalCorrelation | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CORRELATION_STORE], 'readonly');
      const store = transaction.objectStore(CORRELATION_STORE);
      const request = store.get(sign);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch correlation');
    });
  }

  async savePathogen(pathogen: PathogenInfo): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PATHOGEN_STORE], 'readwrite');
      const store = transaction.objectStore(PATHOGEN_STORE);
      const request = store.put(pathogen);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save pathogen');
    });
  }

  async getPathogen(name: string): Promise<PathogenInfo | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PATHOGEN_STORE], 'readonly');
      const store = transaction.objectStore(PATHOGEN_STORE);
      const request = store.get(name);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch pathogen');
    });
  }

  async saveAntibiotic(antibiotic: AntibioticInfo): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ANTIBIOTIC_STORE], 'readwrite');
      const store = transaction.objectStore(ANTIBIOTIC_STORE);
      const request = store.put(antibiotic);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save antibiotic');
    });
  }

  async getAntibiotic(name: string): Promise<AntibioticInfo | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ANTIBIOTIC_STORE], 'readonly');
      const store = transaction.objectStore(ANTIBIOTIC_STORE);
      const request = store.get(name);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch antibiotic');
    });
  }

  async saveSynthesis(id: string, synthesis: DifferentialSynthesis): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SYNTHESIS_STORE], 'readwrite');
      const store = transaction.objectStore(SYNTHESIS_STORE);
      const request = store.put({ ...synthesis, id });
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save synthesis');
    });
  }

  async getSynthesis(id: string): Promise<DifferentialSynthesis | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([SYNTHESIS_STORE], 'readonly');
      const store = transaction.objectStore(SYNTHESIS_STORE);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to fetch synthesis');
    });
  }

  async saveStudyProgress(progress: any): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STUDY_PROGRESS_STORE], 'readwrite');
      const store = transaction.objectStore(STUDY_PROGRESS_STORE);
      const request = store.put(progress);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save study progress');
    });
  }

  async getAllStudyProgress(): Promise<any[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STUDY_PROGRESS_STORE], 'readonly');
      const store = transaction.objectStore(STUDY_PROGRESS_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to fetch study progress');
    });
  }

  async saveExamSession(session: any): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_SESSION_STORE], 'readwrite');
      const store = transaction.objectStore(EXAM_SESSION_STORE);
      const request = store.put(session);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save exam session');
    });
  }

  async getAllExamSessions(): Promise<any[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_SESSION_STORE], 'readonly');
      const store = transaction.objectStore(EXAM_SESSION_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to fetch exam sessions');
    });
  }

  async saveAnaesthesiaDrug(drug: AnaesthesiaDrug): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ANAESTHESIA_DRUG_STORE], 'readwrite');
      const store = transaction.objectStore(ANAESTHESIA_DRUG_STORE);
      const request = store.put(drug);
      request.onsuccess = () => resolve();
      request.onerror = () => reject('Failed to save anaesthesia drug');
    });
  }

  async getAnaesthesiaDrugs(): Promise<AnaesthesiaDrug[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ANAESTHESIA_DRUG_STORE], 'readonly');
      const store = transaction.objectStore(ANAESTHESIA_DRUG_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject('Failed to get anaesthesia drugs');
    });
  }

  async getAnaesthesiaDrug(name: string): Promise<AnaesthesiaDrug | null> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ANAESTHESIA_DRUG_STORE], 'readonly');
      const store = transaction.objectStore(ANAESTHESIA_DRUG_STORE);
      const request = store.get(name);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject('Failed to get anaesthesia drug');
    });
  }

  async clearArchive(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXAM_STORE, ASSET_STORE], 'readwrite');
      transaction.objectStore(EXAM_STORE).clear();
      transaction.objectStore(ASSET_STORE).clear();

      // Clean up memory
      this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
      this.objectUrls.clear();

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject('Failed to clear stores');
    });
  }
}

export const storage = new StorageService();
