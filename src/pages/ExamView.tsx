import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Examination, ClinicalCorrelation, ExamStep, ExamSystem } from '../types';
import { GeminiService } from '../services/geminiService';
import { SYSTEM_THEMES, DEFAULT_STYLE } from '../theme';
import { useExamEditor } from '../hooks/useExamEditor';
import { storage } from '../services/storageService';
import { useAppStore } from '../store/useAppStore';
import { EXAMINATIONS } from '../constants';
import ImageModal from '../components/common/ImageModal';
import {
  Clock,
  Activity,
  FileText,
  ImageIcon,
  Microscope,
  ListCheck,
  Sparkles,
  Send,
  RotateCcw,
  RefreshCw,
  X,
  Info
} from 'lucide-react';

import { WorkspaceLayout } from '../features/ClinicalWorkspace/WorkspaceLayout';
import { useClinicalHistory, HistoryItem } from '../hooks/useClinicalHistory';
import { ExamStepsTab } from '../features/ExamView/ExamStepsTab';
import { ExamVisualsTab } from '../features/ExamView/ExamVisualsTab';
import { ExamOnePagerTab } from '../features/ExamView/ExamOnePagerTab';
import { ExamPhysiologyTab } from '../features/ExamView/ExamPhysiologyTab';
import { ExamClinicalTab } from '../features/ExamView/ExamClinicalTab';
import { PathoSignDetail } from '../features/ExamView/PathoSignDetail';
import { StepsDetail } from '../features/ExamView/StepsDetail';
import { PhysiologyDetail } from '../features/ExamView/PhysiologyDetail';
import { ClinicalDetail } from '../features/ExamView/ClinicalDetail';
import { MainPhysiologyTabContent } from '../features/ExamView/MainPhysiologyTabContent';
import { MainClinicalTabContent } from '../features/ExamView/MainClinicalTabContent';
import { ExamHeader } from '../features/ExamView/components/ExamHeader';
import { ExamNotFound } from '../features/ExamView/components/ExamNotFound';
import { ExamResearching } from '../features/ExamView/components/ExamResearching';

interface ExamViewProps {
  exam?: Examination;
  onBack?: () => void;
  isEditMode?: boolean;
  onUpdate?: (updated: Examination) => void;
  onNavigateToGlossary?: (term: string) => void;
  onSelectSystem?: (system: ExamSystem) => void;
}

const dummyExam: Examination = {
  id: '',
  system: '',
  name: '',
  shortDescription: '',
  steps: [],
  keywords: []
};

const ExamView: React.FC<ExamViewProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useAppStore();

  // Resolve exam: from props > selectedExam in store > downloadedExams > EXAMINATIONS
  const resolvedExam =
    props.exam ??
    (store.selectedExam?.id === id ? store.selectedExam : null) ??
    store.downloadedExams.find((e) => e.id === id) ??
    EXAMINATIONS.find((e) => e.id === id) ??
    null;

  const propsOnBack = props.onBack;
  const onBack = useMemo(
    () => propsOnBack ?? (() => navigate('/library')),
    [propsOnBack, navigate]
  );
  const isEditMode = props.isEditMode ?? store.isEditMode;
  const propsOnNavigateToGlossary = props.onNavigateToGlossary;
  const onNavigateToGlossary = useMemo(
    () =>
      propsOnNavigateToGlossary ??
      ((term: string) => {
        store.setGlossaryTerm(term);
        navigate('/glossary');
      }),
    [propsOnNavigateToGlossary, navigate, store]
  );
  const propsOnSelectSystem = props.onSelectSystem;
  const onSelectSystem = useMemo(
    () =>
      propsOnSelectSystem ??
      ((sys: ExamSystem) => {
        store.setSelectedSystem(sys);
      }),
    [propsOnSelectSystem, store]
  );
  const onUpdate = props.onUpdate;

  const initialExam = resolvedExam || dummyExam;

  const { exam, setExam, updateGeneralField, updateStepField, addStep, removeStep, moveStep } =
    useExamEditor(initialExam, onUpdate);

  const [activeTab, setActiveTab] = useState<
    'steps' | 'physiology' | 'clinical' | 'onepager' | 'visuals'
  >('steps');
  const [isResearching, setIsResearching] = useState(false);

  // Clinical History hook integration
  const { history, addToHistory, clearHistory } = useClinicalHistory();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
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
    } catch {
      alert('Generation failed. Check connectivity.');
    }
  };

  const progress =
    (exam.steps || []).length > 0
      ? Math.round((checkedSteps.size / (exam.steps || []).length) * 100)
      : 0;

  const handleRefine = useCallback(async () => {
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
  }, [exam, refinementPrompt, gemini, setExam]);

  const handleUndoRefine = useCallback(() => {
    if (lastExamState) {
      setExam(lastExamState);
      setLastExamState(null);
      setShowUndo(false);
    }
  }, [lastExamState, setExam]);

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
        <PathoSignDetail
          selectedPathoSign={selectedPathoSign}
          setSelectedPathoSign={setSelectedPathoSign}
          loadingPathoData={loadingPathoData}
          pathoSignData={pathoSignData}
        />
      );
    }

    if (activeTab === 'steps') {
      return (
        <StepsDetail
          exam={exam}
          progress={progress}
          checkedSteps={checkedSteps}
          refinementPrompt={refinementPrompt}
          setRefinementPrompt={setRefinementPrompt}
          isRefining={isRefining}
          handleRefine={handleRefine}
          showUndo={showUndo}
          handleUndoRefine={handleUndoRefine}
        />
      );
    }

    if (activeTab === 'physiology') {
      const bucketIndex = selectedPhysiologyBucket ?? 0;
      const bucket = exam.physiologyBuckets?.[bucketIndex];
      return <PhysiologyDetail bucket={bucket} />;
    }

    if (activeTab === 'clinical') {
      const diffIndex = selectedDifferentialIndex ?? 0;
      const diff = exam.differentialDiagnoses?.[diffIndex];
      return <ClinicalDetail diff={diff} />;
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
    selectedPathoSign,
    loadingPathoData,
    pathoSignData,
    selectedPhysiologyBucket,
    selectedDifferentialIndex,
    exam,
    checkedSteps,
    refinementPrompt,
    isRefining,
    showUndo,
    handleRefine,
    handleUndoRefine,
    progress
  ]);

  if (!resolvedExam) {
    return <ExamNotFound />;
  }

  if (isResearching) {
    return <ExamResearching />;
  }

  return (
    <WorkspaceLayout
      activeSystem={exam.system as ExamSystem}
      onSelectSystem={onSelectSystem || (() => {})}
      activeExamName={exam.name}
      activeTab={activeTab}
      onSelectTab={(tab) =>
        setActiveTab(tab as 'clinical' | 'physiology' | 'steps' | 'onepager' | 'visuals')
      }
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
            <ExamHeader exam={exam} progress={progress} />

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

        {activeTab === 'physiology' &&
          (isEditMode ? (
            <ExamPhysiologyTab
              exam={exam}
              isEditMode={isEditMode}
              updateGeneralField={updateGeneralField}
            />
          ) : (
            <MainPhysiologyTabContent
              exam={exam}
              selectedPhysiologyBucket={selectedPhysiologyBucket}
              setSelectedPhysiologyBucket={setSelectedPhysiologyBucket}
              addToHistory={addToHistory}
            />
          ))}

        {activeTab === 'clinical' &&
          (isEditMode ? (
            <ExamClinicalTab
              exam={exam}
              isEditMode={isEditMode}
              updateGeneralField={updateGeneralField}
            />
          ) : (
            <MainClinicalTabContent
              exam={exam}
              selectedDifferentialIndex={selectedDifferentialIndex}
              setSelectedDifferentialIndex={setSelectedDifferentialIndex}
            />
          ))}

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
