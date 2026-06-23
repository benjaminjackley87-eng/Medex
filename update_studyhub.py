with open("src/pages/StudyHubView.tsx", "r") as f:
    content = f.read()

# Replace render methods and add imports
start_idx = content.find("const renderDashboard = () => (")
if start_idx != -1:
    end_idx = content.find("const renderSidebar = () => {")

    replacement = """
  const renderSidebar = () => {"""

    content = content[:start_idx] + replacement + content[end_idx + len("const renderSidebar = () => {"):]

imports = """import DashboardView from './StudyHub/components/DashboardView';
import SessionView from './StudyHub/components/SessionView';
import ResultsView from './StudyHub/components/ResultsView';
"""

# Insert imports
import_idx = content.find("import GlowContainer")
if import_idx != -1:
    content = content[:import_idx] + imports + content[import_idx:]

# Update the render section
old_render = """        ) : (
          <>
            {view === 'dashboard' && renderDashboard()}
            {view === 'session' && renderSession()}
            {view === 'results' && renderResults()}
          </>
        )}"""

new_render = """        ) : (
          <>
            {view === 'dashboard' && (
              <DashboardView
                progress={progress}
                sessions={sessions}
                rgaTopics={RGA_TOPICS}
                startSession={startSession}
              />
            )}
            {view === 'session' && (
              <SessionView
                currentSession={currentSession}
                currentQuestionIndex={currentQuestionIndex}
                selectedOption={selectedOption}
                showExplanation={showExplanation}
                setView={setView}
                handleAnswer={handleAnswer}
                nextQuestion={nextQuestion}
              />
            )}
            {view === 'results' && (
              <ResultsView
                currentSession={currentSession}
                selectedTopic={selectedTopic}
                setView={setView}
                startSession={startSession}
              />
            )}
          </>
        )}"""

content = content.replace(old_render, new_render)

# Remove unused imports
content = content.replace("import { motion, AnimatePresence } from 'motion/react';\\n", "")
content = content.replace("import { MCQQuestion, StudyProgress, ExamSession } from '../types';", "import { StudyProgress, ExamSession } from '../types';")
content = content.replace("""import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';""", "")

content = content.replace("""import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Brain,
  Stethoscope,
  Activity,
  Zap,
  Loader2,
  ArrowLeft,
  RefreshCcw,
  GraduationCap
} from 'lucide-react';""", """import {
  BookOpen,
  Trophy,
  Target,
  Brain,
  Stethoscope,
  Activity,
  Zap,
  Loader2,
  GraduationCap
} from 'lucide-react';""")

with open("src/pages/StudyHubView.tsx", "w") as f:
    f.write(content)
