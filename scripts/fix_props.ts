import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string, search: RegExp | string, replace: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(search, replace);
    fs.writeFileSync(filePath, content);
}

// 1. LibraryView.tsx
const libPath = 'src/pages/LibraryView.tsx';
replaceInFile(libPath, 
`interface LibraryViewProps {`, 
`interface LibraryViewProps {`);

// We'll just read and replace LibraryView's signature
let libContent = fs.readFileSync(libPath, 'utf-8');
libContent = libContent.replace(
`const LibraryView: React.FC<LibraryViewProps> = ({
  displayGroups,
  expandedSystems,
  toggleSystemExpansion,
  onSelectExam,
  onSyncExam,
  onNavigateToView,
  downloadedIds,
  syncingIds,
  downloadedExams,
  isSearching,
  didYouMean,
  onDidYouMeanClick
}) => {`,
`import { useExaminations } from '../hooks/useExaminations';
import { useDownloadStatus } from '../hooks/useDownloadStatus';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

const LibraryView: React.FC<Partial<LibraryViewProps>> = (props) => {
  const hooks = useExaminations();
  const store = useAppStore();
  const reactNavigate = useNavigate();
  const { startDownload } = useDownloadStatus();

  const displayGroups = props.displayGroups ?? hooks.displayGroups;
  const expandedSystems = props.expandedSystems ?? hooks.expandedSystems;
  const toggleSystemExpansion = props.toggleSystemExpansion ?? hooks.toggleSystemExpansion;
  const downloadedIds = props.downloadedIds ?? store.downloadedIds;
  const syncingIds = props.syncingIds ?? store.syncingIds;
  const downloadedExams = props.downloadedExams ?? store.downloadedExams;
  const isSearching = props.isSearching ?? false;
  const didYouMean = props.didYouMean ?? hooks.didYouMean;
  
  const onSelectExam = props.onSelectExam ?? ((exam: any) => { store.setSelectedExam(exam); reactNavigate('/exam/' + exam.id); });
  const onSyncExam = props.onSyncExam ?? ((examId: string) => { const e = hooks.examinations.find(x => x.id === examId); if (e) startDownload(e); });
  const onNavigateToView = props.onNavigateToView ?? ((view: string) => reactNavigate('/' + view));
  const onDidYouMeanClick = props.onDidYouMeanClick ?? ((term: string) => store.setSearchQuery(term));
`);
fs.writeFileSync(libPath, libContent);


// 2. ExamView.tsx
const examPath = 'src/pages/ExamView.tsx';
let examContent = fs.readFileSync(examPath, 'utf-8');
examContent = examContent.replace(
`const ExamView: React.FC<ExamViewProps> = ({
  exam: initialExam,
  onBack,
  isEditMode,
  onUpdate,
  onNavigateToGlossary,
  onSelectSystem
}) => {`,
`import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const ExamView: React.FC<Partial<ExamViewProps>> = (props) => {
  const { id } = useParams<{ id: string }>();
  const reactNavigate = useNavigate();
  const store = useAppStore();

  const resolvedExam = props.exam ?? store.selectedExam ?? store.downloadedExams.find(e => e.id === id);
  
  const onBack = props.onBack ?? (() => reactNavigate('/library'));
  const isEditMode = props.isEditMode ?? store.isEditMode;
  const onNavigateToGlossary = props.onNavigateToGlossary ?? ((term: string) => { store.setGlossaryTerm(term); reactNavigate('/glossary'); });
  const onSelectSystem = props.onSelectSystem ?? ((sys: any) => { store.setSelectedSystem(sys); reactNavigate('/workspace'); });
  
  if (!resolvedExam) return <div className="p-8 text-white">Exam not found</div>;
  const initialExam = resolvedExam;
  const onUpdate = props.onUpdate;
`);
fs.writeFileSync(examPath, examContent);

// 3. SettingsView.tsx
const setPath = 'src/pages/SettingsView.tsx';
let setContent = fs.readFileSync(setPath, 'utf-8');
setContent = setContent.replace(
`const SettingsView: React.FC<SettingsViewProps> = ({
  isDevMode,
  onToggleDevMode,
  isEditMode,
  onToggleEditMode,
  onClearData,
  onExportData,
  onImportData
}) => {`,
`import { useAppStore } from '../store/useAppStore';
const SettingsView: React.FC<Partial<SettingsViewProps>> = (props) => {
  const store = useAppStore();
  const isDevMode = props.isDevMode ?? store.isDevMode;
  const isEditMode = props.isEditMode ?? store.isEditMode;
  const onToggleDevMode = props.onToggleDevMode ?? (() => store.setIsDevMode(!isDevMode));
  const onToggleEditMode = props.onToggleEditMode ?? (() => store.setIsEditMode(!isEditMode));
  const onClearData = props.onClearData ?? (() => {});
  const onExportData = props.onExportData ?? (() => {});
  const onImportData = props.onImportData ?? (() => {});
`);
fs.writeFileSync(setPath, setContent);

// 4. SymptomChecker.tsx
const symPath = 'src/pages/SymptomChecker.tsx';
let symContent = fs.readFileSync(symPath, 'utf-8');
symContent = symContent.replace(
`const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSelectExam }) => {`,
`import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
const SymptomChecker: React.FC<Partial<SymptomCheckerProps>> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();
  const onSelectExam = props.onSelectExam ?? ((exam: any) => { store.setSelectedExam(exam); reactNavigate('/exam/' + exam.id); });
`);
fs.writeFileSync(symPath, symContent);

// 5. WorkspaceLayout.tsx
const workPath = 'src/features/ClinicalWorkspace/WorkspaceLayout.tsx';
if (fs.existsSync(workPath)) {
  let workContent = fs.readFileSync(workPath, 'utf-8');
  workContent = workContent.replace(
`const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  activeSystem,
  onSelectSystem,
  activeExamName,
  activeTab,
  onSelectTab,
  tabs,
  history,
  onClearHistory,
  onSelectHistoryItem,
  onBackToLibrary,
  children,
  detailContent
}) => {`,
`import { useAppStore } from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';
const WorkspaceLayout: React.FC<Partial<WorkspaceLayoutProps>> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();
  const activeSystem = props.activeSystem ?? store.selectedSystem ?? '';
  const onSelectSystem = props.onSelectSystem ?? ((sys: any) => store.setSelectedSystem(sys));
  const activeExamName = props.activeExamName ?? store.selectedExam?.name;
  const activeTab = props.activeTab ?? '';
  const onSelectTab = props.onSelectTab ?? (() => {});
  const tabs = props.tabs ?? [];
  const history = props.history ?? [];
  const onClearHistory = props.onClearHistory ?? (() => {});
  const onSelectHistoryItem = props.onSelectHistoryItem ?? (() => {});
  const onBackToLibrary = props.onBackToLibrary ?? (() => reactNavigate('/library'));
  const children = props.children;
  const detailContent = props.detailContent;
`);
  fs.writeFileSync(workPath, workContent);
}

// 6. DevAssistant.tsx
const devPath = 'src/pages/DevAssistant.tsx';
if (fs.existsSync(devPath)) {
  let devContent = fs.readFileSync(devPath, 'utf-8');
  devContent = devContent.replace(
`const DevAssistant: React.FC<DevAssistantProps> = ({
  onClose,
  currentTheme,
  onUpdateTheme,
  customTools = []
}) => {`,
`import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
const DevAssistant: React.FC<Partial<DevAssistantProps>> = (props) => {
  const store = useAppStore();
  const reactNavigate = useNavigate();
  const onClose = props.onClose ?? (() => reactNavigate(-1));
  const currentTheme = props.currentTheme ?? store.theme;
  const onUpdateTheme = props.onUpdateTheme ?? ((t: any) => store.setTheme(t));
  const customTools = props.customTools ?? [];
`);
  fs.writeFileSync(devPath, devContent);
}

console.log('Props patched!');
