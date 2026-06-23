import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Examination, ClinicalCorrelation, ExamStep, LearningStatus, ExamSystem } from '../types';
import { GeminiService } from '../services/geminiService';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../theme';
import { useExamEditor } from '../hooks/useExamEditor';
import { storage } from '../services/storageService';
import { useAppStore } from '../store/useAppStore';
import { EXAMINATIONS } from '../constants';
import MedImage from '../components/common/MedImage';
import ImageModal from '../components/common/ImageModal';
import {
  ArrowLeft,
  Save,
  ChevronUp,
  ChevronDown,
  Plus,
  BookOpen,
  Clock,
  Activity,
  Layout,
  FileText,
  ImageIcon,
  Microscope,
  ListCheck,
  Sparkles,
  Send,
  RotateCcw,
  RefreshCw,
  X,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  UserCheck,
  Info,
  ChevronRight
} from 'lucide-react';

import { WorkspaceLayout } from '../features/ClinicalWorkspace/WorkspaceLayout';
import { useClinicalHistory, HistoryItem } from '../hooks/useClinicalHistory';
import { ExamStepsTab } from '../features/ExamView/ExamStepsTab';
import { ExamPhysiologyTab } from '../features/ExamView/ExamPhysiologyTab';
import { ExamClinicalTab } from '../features/ExamView/ExamClinicalTab';
import { ExamVisualsTab } from '../features/ExamView/ExamVisualsTab';
import { ExamOnePagerTab } from '../features/ExamView/ExamOnePagerTab';
import { ExamStepCard } from '../features/ExamView/ExamStepCard';

interface ExamViewProps {
  exam?: Examination;
  onBack?: () => void;
  isEditMode?: boolean;
  onUpdate?: (updated: Examination) => void;
  onNavigateToGlossary?: (term: string) => void;
  onSelectSystem?: (system: ExamSystem) => void;
}

const ExamView: React.FC<ExamViewProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useAppStore();

  // Resolve exam: from props > selectedExam in store > downloadedExams > EXAMINATIONS
  const resolvedExam = props.exam
    ?? (store.selectedExam?.id === id ? store.selectedExam : null)
    ?? store.downloadedExams.find((e) => e.id === id)
    ?? EXAMINATIONS.find((e) => e.id === id)
    ?? null;

  const onBack = props.onBack ?? (() => navigate('/library'));
  const isEditMode = props.isEditMode ?? store.isEditMode;
  const onNavigateToGlossary = props.onNavigateToGlossary ?? ((term: string) => { store.setGlossaryTerm(term); navigate('/glossary'); });
  const onSelectSystem = props.onSelectSystem ?? ((sys: ExamSystem) => { store.setSelectedSystem(sys); });
  const onUpdate = props.onUpdate;

  if (!resolvedExam) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8">
        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Exam Not Found</p>
        <button onClick={() => navigate('/library')} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider">
          Back to Library
        </button>
      </div>
    );
  }

  const initialExam = resolvedExam;

  const {
    exam,
    setExam,
    isDirty,
    updateGeneralField,
    updateStepField,
    addStep,
    removeStep,
    moveStep,
    handleSave
  } = useExamEditor(initialExam, onUpdate);

  const [activeTab, setActiveTab] = useState<
    'steps' | 'physiology' | 'clinical' | 'onepager' | 'visuals'
  >('steps');
  const [isResearching, setIsResearching] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Clinical History hook integration
  const { history, addToHistory, clearHistory, removeFromHistory } = useClinicalHistory();

  // Dynamic detail side-panel states
  const [selectedPathoSign, setSelectedPathoSign] = useState<string | null>(null);
  const [pathoSignData, setPathoSignData] = useState<ClinicalCorrelation | null>(null);
  const [loadingPathoData, setLoadingPathoData] = useState(false);

  // Selected details for Column 3
  const [selectedPhysiologyBucket, setSelectedPhysiologyBucket] = useState<number | null>(null);
  const [selectedDifferentialIndex, setSelectedDifferentialIndex] = useState<number | null>(null);

  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(`checkedSteps_${exam.id}`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist checkedSteps when they change
  useEffect(() => {
    try {
      localStorage.setItem(`checkedSteps_${exam.id}`, JSON.stringify(Array.from(checkedSteps)));
    } catch (e) {
      console.error('Failed to save checked steps:', e);
    }
  }, [checkedSteps, exam.id]);

  const [focusMode, setFocusMode] = useState(false);

  const [newFindingText, setNewFindingText] = useState<Record<string, string>>({});
  const [newNormalText, setNewNormalText] = useState<Record<string, string>>({});
  const [newPathoFinding, setNewPathoFinding] = useState<Record<string, string>>({});
  const [newPathoMechanism, setNewPathoMechanism] = useState<Record<string, string>>({});
  const [newPearlText, setNewPearlText] = useState<Record<string, string>>({});

  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [lastExamState, setLastExamState] = useState<Examination | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  const gemini = useMemo(() => new GeminiService(), []);
  const theme = SYSTEM_THEMES[exam.system] || DEFAULT_STYLE;

  const categorizedSteps = useMemo(() => {
    const groups: Record<string, { steps: ExamStep[]; indices: number[] }> = {};
    (exam.steps || []).forEach((step, index) => {
      const cat = step.category || 'General';
      if (!groups[cat]) groups[cat] = { steps: [], indices: [] };
      groups[cat].steps.push(step);
      groups[cat].indices.push(index);
    });
    return groups;
  }, [exam.steps]);

  // Set default selected step when steps load
  useEffect(() => {
    if (exam.steps && exam.steps.length > 0 && !selectedStepId) {
      setSelectedStepId(exam.steps[0].id);
    }
  }, [exam.steps, selectedStepId]);

  // Escape key navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (enlargedImage) {
          setEnlargedImage(null);
        } else if (selectedPathoSign) {
          setSelectedPathoSign(null);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, enlargedImage, selectedPathoSign]);

  useEffect(() => {
    const research = async () => {
      if ((exam.steps || []).length === 0 && navigator.onLine && !exam.isDownloaded) {
        setIsResearching(true);
        try {
          const res = await gemini.populateExamination(exam);
          setExam((prev) => ({ ...prev, ...res, isDraft: false }));
        } catch (e) {
          console.error(e);
        } finally {
          setIsResearching(false);
        }
      }
    };
    research();
  }, [exam.id, exam.isDownloaded, gemini, setExam]);

  const fetchClinicalCorrelation = async (sign: string) => {
    addToHistory('finding', sign);
    setSelectedPathoSign(sign);
    setLoadingPathoData(true);
    setPathoSignData(null);
    try {
      const data = await gemini.getClinicalCorrelation(sign, exam.system, false);
      setPathoSignData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPathoData(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    if (item.type === 'finding') {
      fetchClinicalCorrelation(item.label);
    } else if (item.type === 'exam') {
      // Navigate to exam
    }
  };

  const handleImageUpload = async (stepId: string | 'header') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const assetId = `custom_${Math.random().toString(36).substr(2, 9)}`;
      await storage.saveAsset(assetId, file);

      if (stepId === 'header') {
        updateGeneralField('localHeaderImageUrl', assetId);
      } else {
        updateStepField(stepId, 'localImageUrl', assetId);
      }
    };
    input.click();
  };

  const handleImageGenerate = async (stepId: string | 'header') => {
    const prompt =
      stepId === 'header'
        ? exam.headerImagePrompt
        : (exam.steps || []).find((s) => s.id === stepId)?.imagePrompt;
    if (!prompt) {
      alert('Please provide an image prompt first.');
      return;
    }

    try {
      const url = await gemini.generateIllustration(prompt, false);
      if (url) {
        const assetId =
          stepId === 'header'
            ? `header_${exam.id}`
            : `step_${stepId}_${Math.random().toString(36).substr(2, 5)}`;
        const localUrl = await storage.saveAsset(assetId, url);

        if (stepId === 'header') {
          updateGeneralField('headerImageUrl', url);
          if (localUrl) updateGeneralField('localHeaderImageUrl', localUrl);
        } else {
          updateStepField(stepId, 'imageUrl', url);
          if (localUrl) updateStepField(stepId, 'localImageUrl', localUrl);
        }
      }
    } catch (e) {
      alert('Generation failed. Check connectivity.');
    }
  };

  const progress =
    (exam.steps || []).length > 0
      ? Math.round((checkedSteps.size / (exam.steps || []).length) * 100)
      : 0;

  const handleRefine = async () => {
    if (!refinementPrompt.trim() || !navigator.onLine) return;
    setIsRefining(true);
    try {
      setLastExamState({ ...exam });
      const refinedData = await gemini.refineExamination(exam, refinementPrompt);
      setExam((prev) => ({ ...prev, ...refinedData }));
      setRefinementPrompt('');
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 10000);
    } catch (e) {
      console.error(e);
      alert('Refinement failed. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  const handleUndoRefine = () => {
    if (lastExamState) {
      setExam(lastExamState);
      setLastExamState(null);
      setShowUndo(false);
    }
  };

  const handleSelectStep = (stepId: string, stepTitle: string) => {
    setSelectedStepId(stepId);
    setSelectedPathoSign(null); // Clear sign details when switching steps
    addToHistory('exam', stepTitle);
  };

  // Build the context tab elements
  const workspaceTabs = [
    { id: 'steps', label: 'Protocol', icon: ListCheck },
    { id: 'physiology', label: 'Physiology', icon: Activity },
    { id: 'clinical', label: 'Clinical', icon: Microscope },
    { id: 'visuals', label: 'Visual Aids', icon: ImageIcon },
    { id: 'onepager', label: 'One-Pager', icon: FileText }
  ];

  // Render Col 3 (Drilled Down details)
  const detailPanelContent = useMemo(() => {
    // If clinical correlation sign is selected
    if (selectedPathoSign) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest">
              {selectedPathoSign}
            </h3>
            <button
              onClick={() => setSelectedPathoSign(null)}
              className="p-1 hover:bg-slate-950/40/5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {loadingPathoData ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
              <span className="text-[9px] font-black uppercase text-slate-400">
                Querying Diagnostics...
              </span>
            </div>
          ) : pathoSignData ? (
            <div className="space-y-6 text-slate-300">
              <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-5">
                <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block mb-2">
                  Pathophysiology
                </span>
                <p className="text-xs font-bold leading-relaxed">{pathoSignData.pathophysiology}</p>
              </div>

              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                  Common Causes
                </span>
                <ul className="space-y-2">
                  {pathoSignData.causes.map((cause, i) => (
                    <li
                      key={i}
                      className="bg-slate-950/40/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-950/200" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Clinical Significance
                </span>
                <p className="text-xs font-semibold leading-relaxed">
                  {pathoSignData.clinicalSignificance}
                </p>
              </div>

              {pathoSignData.affectedAnatomy && (
                <div className="bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-400 block mb-2">
                    Anatomical Focus
                  </span>
                  <p className="text-xs font-bold leading-relaxed">
                    {pathoSignData.affectedAnatomy}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Failed to retrieve clinical correlation.
            </p>
          )}
        </div>
      );
    }

    if (activeTab === 'steps') {
      return (
        <div className="space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">
              Dossier Highlights
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">{exam.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">
                Estimated Time
              </span>
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-450" />
                <span>12-15 Min</span>
              </div>
            </div>
            {exam.referenceStandard && (
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  Reference Level
                </span>
                <span
                  className="text-xs font-black text-indigo-400 truncate"
                  title={exam.referenceStandard}
                >
                  {exam.referenceStandard}
                </span>
              </div>
            )}
          </div>

          <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                OSCE Progress
              </span>
              <span className="text-xs font-black text-emerald-450">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-black text-slate-550 uppercase tracking-widest">
              <span>{checkedSteps.size} Checked</span>
              <span>{exam.steps.length - checkedSteps.size} Left</span>
            </div>
          </div>

          <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                AI Protocol Refinement
              </span>
            </div>
            <p className="text-[9px] font-medium text-slate-400 leading-relaxed">
              Ask AI to add details, pathophysiology, or specific stigmata findings to this
              protocol.
            </p>
            <textarea
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              placeholder="e.g. Add details for auscultatory zones..."
              className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-indigo-500 min-h-[90px] resize-none text-slate-350 placeholder:text-slate-400"
              disabled={isRefining}
            />
            <button
              onClick={handleRefine}
              disabled={isRefining || !refinementPrompt.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40 transition-all"
            >
              {isRefining ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              Refine Protocol
            </button>
            {showUndo && (
              <button
                onClick={handleUndoRefine}
                className="w-full py-2 bg-amber-950/40 border border-amber-500/20 text-amber-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-900/40 transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                Undo Refinement
              </button>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === 'physiology') {
      if (
        selectedPhysiologyBucket === null &&
        exam.physiologyBuckets &&
        exam.physiologyBuckets.length > 0
      ) {
        setSelectedPhysiologyBucket(0);
      }

      const bucket = exam.physiologyBuckets?.[selectedPhysiologyBucket || 0];
      if (!bucket) return null;

      return (
        <div className="space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
              Physiological Sub-Matrix
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {bucket.title}
            </h3>
          </div>

          <div className="space-y-4">
            {bucket.content.map((item, i) => (
              <div
                key={i}
                className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all"
              >
                <span className="text-[10px] font-black text-emerald-400 block mb-2 uppercase tracking-wide">
                  {item.label}
                </span>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'clinical') {
      if (
        selectedDifferentialIndex === null &&
        exam.differentialDiagnoses &&
        exam.differentialDiagnoses.length > 0
      ) {
        setSelectedDifferentialIndex(0);
      }

      const diff = exam.differentialDiagnoses?.[selectedDifferentialIndex || 0];
      if (!diff) return null;

      return (
        <div className="space-y-6">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block mb-1">
              Diagnostic Detail
            </span>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {diff.condition}
            </h3>
          </div>

          <div className="bg-slate-950/40/5 border border-white/5 rounded-2xl p-5 leading-relaxed">
            <span className="text-[9px] font-black text-rose-400 uppercase tracking-wider block mb-2">
              Clinical Explanation
            </span>
            <p className="text-xs font-semibold text-slate-300">{diff.explanation}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <Info className="w-8 h-8 opacity-20 mb-2" />
        <p className="text-[9px] font-bold uppercase tracking-wider">
          Additional details available in Middle Column
        </p>
      </div>
    );
  }, [
    activeTab,
    selectedStepId,
    selectedPathoSign,
    loadingPathoData,
    pathoSignData,
    selectedPhysiologyBucket,
    selectedDifferentialIndex,
    exam,
    checkedSteps,
    isEditMode,
    refinementPrompt,
    isRefining,
    showUndo
  ]);

  if (isResearching)
    return (
      <div className="h-full flex flex-col items-center justify-center p-20 bg-slate-950 text-slate-100">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-white/10 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          <Activity className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-micro text-slate-400 tracking-[0.3em] mb-2">Synthesizing Protocol</p>
        <p className="text-[11px] font-bold text-slate-400 italic">
          Consulting evidence-based medical literature...
        </p>
      </div>
    );

  return (
    <WorkspaceLayout
      activeSystem={exam.system as ExamSystem}
      onSelectSystem={onSelectSystem || (() => {})}
      activeExamName={exam.name}
      activeTab={activeTab}
      onSelectTab={(tab) => setActiveTab(tab)}
      tabs={workspaceTabs}
      history={history}
      onClearHistory={clearHistory}
      onSelectHistoryItem={handleSelectHistoryItem}
      onBackToLibrary={onBack}
      detailContent={detailPanelContent}
    >
      {/* COLUMN 2 CONTENT (renders inside the middle layout panel) */}
      <div className="space-y-8">
        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-950/200/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-wider mb-1">
                  {exam.name}
                </h2>
                <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                  "{exam.shortDescription}"
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xs font-black text-indigo-400">{exam.steps.length}</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    Steps
                  </span>
                </div>
                <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xs font-black text-emerald-400">{progress}%</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    Mastery
                  </span>
                </div>
              </div>
            </div>

            <ExamStepsTab
              exam={exam}
              theme={theme}
              isEditMode={isEditMode}
              progress={progress}
              checkedSteps={checkedSteps}
              setCheckedSteps={setCheckedSteps}
              categorizedSteps={categorizedSteps}
              refinementPrompt={refinementPrompt}
              setRefinementPrompt={setRefinementPrompt}
              isRefining={isRefining}
              showUndo={showUndo}
              handleRefine={handleRefine}
              handleUndoRefine={handleUndoRefine}
              addStep={addStep}
              removeStep={removeStep}
              moveStep={moveStep}
              updateStepField={updateStepField}
              updateGeneralField={updateGeneralField}
              handleImageUpload={handleImageUpload}
              handleImageGenerate={handleImageGenerate}
              setEnlargedImage={setEnlargedImage}
              fetchClinicalCorrelation={fetchClinicalCorrelation}
              onNavigateToGlossary={onNavigateToGlossary}
              newFindingText={newFindingText}
              setNewFindingText={setNewFindingText}
              newNormalText={newNormalText}
              setNewNormalText={setNewNormalText}
              newPathoFinding={newPathoFinding}
              setNewPathoFinding={setNewPathoFinding}
              newPathoMechanism={newPathoMechanism}
              setNewPathoMechanism={setNewPathoMechanism}
              newPearlText={newPearlText}
              setNewPearlText={setNewPearlText}
              hideAside={true}
            />
          </div>
        )}

        {activeTab === 'physiology' && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Physiological Mechanics
              </h3>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                Click any of the sub-systems below to open the deep-dive mechanical simulator,
                pressure-volume loop, or clinical values in the detail panel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exam.physiologyBuckets?.map((bucket, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPhysiologyBucket(idx);
                    addToHistory('physiology', bucket.title);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedPhysiologyBucket === idx
                      ? 'bg-emerald-950/10 border-emerald-500/40 shadow-lg shadow-emerald-950/40'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/10'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    Sub-Matrix {idx + 1}
                  </span>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight mt-1 mb-2">
                    {bucket.title}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 truncate">
                    {bucket.content.map((c) => c.label).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-6">
            <div className="bg-rose-950/15 border border-rose-500/20 rounded-3xl p-6">
              <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Critical Red Flags
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {exam.redFlags?.map((flag, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-900/40 border border-white/5 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-950/200 shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Differential Diagnoses
              </span>
              <div className="grid grid-cols-1 gap-3">
                {exam.differentialDiagnoses?.map((dd, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedDifferentialIndex(idx)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedDifferentialIndex === idx
                        ? 'bg-rose-950/10 border-rose-500/40 shadow-lg shadow-rose-900/20'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">
                      {dd.condition}
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 leading-relaxed line-clamp-2">
                      {dd.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visuals' && (
          <ExamVisualsTab
            exam={exam}
            setEnlargedImage={setEnlargedImage}
            handleImageGenerate={handleImageGenerate}
          />
        )}

        {activeTab === 'onepager' && (
          <div className="space-y-6">
            <ExamOnePagerTab
              exam={exam}
              isEditMode={isEditMode}
              updateGeneralField={updateGeneralField}
            />
          </div>
        )}
      </div>

      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </WorkspaceLayout>
  );
};

export default ExamView;
