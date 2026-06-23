import React, { useState, useMemo } from 'react';
import {
  Microscope,
  Activity,
  Zap,
  FileText,
  Search,
  BrainCircuit,
  ArrowRight,
  Info,
  Image as ImageIcon,
  Wind,
  Droplets,
  FlaskConical,
  Baby,
  ClipboardCheck,
  BookOpen
} from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { ConditionInvestigation, InvestigationDetail } from '../../types';
import ImageModal from '../../components/common/ImageModal';
import {
  ImagingGuide,
  ECGGuide,
  ABGGuide,
  LabsGuide,
  SpirometryGuide,
  FluidAnalysisGuide,
  UrinalysisGuide,
  CTGGuide,
  PreventiveGuide,
  PharmacologyGuide
} from './categoryViews';

interface InvestigationHubProps {
  initialSearchQuery?: string;
  onSearchHandled?: () => void;
}

const InvestigationHub: React.FC<InvestigationHubProps> = ({
  initialSearchQuery,
  onSearchHandled
}) => {
  const [activeTab, setActiveTab] = useState<'guides' | 'search' | 'patterns'>('guides');
  const [activeCategory, setActiveCategory] = useState<
    | 'imaging'
    | 'ecg'
    | 'abg'
    | 'labs'
    | 'spirometry'
    | 'fluids'
    | 'urinalysis'
    | 'ctg'
    | 'preventive'
    | 'pharmacology'
  >('imaging');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [searchResult, setSearchResult] = useState<ConditionInvestigation | null>(null);
  const [selectedInvestigation, setSelectedInvestigation] = useState<string | null>(null);
  const [investigationDetails, setInvestigationDetails] = useState<InvestigationDetail | null>(
    null
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const gemini = useMemo(() => new GeminiService(), []);

  const handleInvestigationClick = async (testName: string, context?: string) => {
    setSelectedInvestigation(testName);
    setIsLoadingDetails(true);
    setInvestigationDetails(null);
    try {
      const details = await gemini.getInvestigationDetails(testName, context);
      setInvestigationDetails(details);
    } catch (error) {
      console.error('Failed to fetch investigation details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  React.useEffect(() => {
    if (initialSearchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery(initialSearchQuery);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('search');
      const performSearch = async () => {
        setIsSearching(true);
        setSearchResult(null);
        try {
          const result = await (gemini as any).getInvestigationsForCondition(initialSearchQuery);
          setSearchResult(result);
        } catch (e) {
          console.error(e);
        } finally {
          setIsSearching(false);
          onSearchHandled?.();
        }
      };
      performSearch();
    }
  }, [initialSearchQuery, gemini, onSearchHandled]);

  const handleConditionSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    try {
      const result = await (gemini as any).getInvestigationsForCondition(searchQuery);
      setSearchResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const categories = [
    { id: 'imaging', label: 'Imaging', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'ecg', label: 'ECG', icon: <Activity className="w-4 h-4" /> },
    { id: 'abg', label: 'ABG', icon: <Zap className="w-4 h-4" /> },
    { id: 'labs', label: 'Labs', icon: <FileText className="w-4 h-4" /> },
    { id: 'spirometry', label: 'Spirometry', icon: <Wind className="w-4 h-4" /> },
    { id: 'fluids', label: 'Fluid Analysis', icon: <Droplets className="w-4 h-4" /> },
    { id: 'urinalysis', label: 'Urinalysis', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'ctg', label: 'CTG', icon: <Baby className="w-4 h-4" /> },
    { id: 'preventive', label: 'GP Guidelines', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'pharmacology', label: 'Pharmacology', icon: <FlaskConical className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 animate-in fade-in duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-950/40 text-emerald-450 border border-emerald-500/20 rounded-xl">
            <Microscope className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter transition-all duration-300">
            Investigation Hub
          </h1>
        </div>
        <p className="text-slate-400 font-medium max-w-2xl">
          Master the interpretation of clinical investigations. From systematic imaging analysis to
          complex ECG rhythms and metabolic derangements.
        </p>
      </header>

      <div className="flex bg-slate-950/60 p-1.5 rounded-2xl mb-12 w-fit border border-white/5">
        <button
          onClick={() => setActiveTab('guides')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'guides' ? 'bg-slate-900 text-emerald-400 border border-white/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <BookOpen className="w-4 h-4" /> Interpretation Guides
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'search' ? 'bg-slate-900 text-blue-400 border border-white/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Search className="w-4 h-4" /> Condition Mapper
        </button>
        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'patterns' ? 'bg-slate-900 text-indigo-400 border border-white/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <BrainCircuit className="w-4 h-4" /> Clinical Patterns
        </button>
      </div>

      {activeTab === 'guides' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-bold transition-all cursor-pointer ${activeCategory === cat.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40' : 'bg-slate-900/50 border border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/5">
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                {categories.find((c) => c.id === activeCategory)?.icon}
                {categories.find((c) => c.id === activeCategory)?.label} Interpretation
              </h2>

              {activeCategory === 'imaging' && (
                <ImagingGuide
                  onInvestigationClick={handleInvestigationClick}
                  onEnlargeImage={(src, alt) => setEnlargedImage({ src, alt })}
                />
              )}

              {activeCategory === 'ecg' && (
                <ECGGuide
                  onInvestigationClick={handleInvestigationClick}
                  onEnlargeImage={(src, alt) => setEnlargedImage({ src, alt })}
                />
              )}

              {activeCategory === 'abg' && (
                <ABGGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'labs' && (
                <LabsGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'spirometry' && (
                <SpirometryGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'fluids' && (
                <FluidAnalysisGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'urinalysis' && (
                <UrinalysisGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'ctg' && (
                <CTGGuide
                  onInvestigationClick={handleInvestigationClick}
                  onEnlargeImage={(src, alt) => setEnlargedImage({ src, alt })}
                />
              )}

              {activeCategory === 'preventive' && (
                <PreventiveGuide onInvestigationClick={handleInvestigationClick} />
              )}

              {activeCategory === 'pharmacology' && (
                <PharmacologyGuide onInvestigationClick={handleInvestigationClick} />
              )}
            </div>
          </main>
        </div>
      ) : activeTab === 'search' ? (
        <div className="space-y-12">
          <section className="bg-slate-900/40 backdrop-blur-xl p-12 rounded-[60px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-950/200/5 blur-[120px] rounded-full"></div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl font-black text-white tracking-tighter mb-6">
                Condition Investigation Mapper
              </h2>
              <p className="text-slate-400 font-medium mb-10 text-lg">
                Input a medical condition to see the required diagnostic pathway, from bedside tests
                to advanced imaging and monitoring.
              </p>

              <form onSubmit={handleConditionSearch} className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Pulmonary Embolism, Heart Failure..."
                  className="w-full pl-16 pr-32 py-6 bg-slate-950 border border-white/5 rounded-[32px] text-lg font-bold focus:border-emerald-500/40 transition-all outline-none text-white"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 hover:bg-emerald-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSearching ? 'Analyzing...' : 'Map Pathway'}
                </button>
              </form>
            </div>
          </section>

          {searchResult && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/5">
                  <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
                    <div className="w-2 h-8 bg-emerald-950/200 rounded-full" />
                    Diagnostic Strategy: {searchResult.condition}
                  </h3>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black text-emerald-450 uppercase tracking-[0.2em] mb-4">
                        First Line / Bedside
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(searchResult.firstLine || []).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleInvestigationClick(item, searchResult.condition)}
                            className="px-5 py-2.5 bg-emerald-950/20 text-emerald-350 rounded-2xl text-[11px] font-bold border border-emerald-500/10 hover:bg-emerald-900/40 transition-colors flex items-center gap-2 group cursor-pointer"
                          >
                            {item}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-blue-455 uppercase tracking-[0.2em] mb-4">
                        Gold Standard / Definitive
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(searchResult.goldStandard || []).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleInvestigationClick(item, searchResult.condition)}
                            className="px-5 py-2.5 bg-blue-950/20 text-blue-350 rounded-2xl text-[11px] font-bold border border-blue-500/10 hover:bg-blue-900/40 transition-colors flex items-center gap-2 group cursor-pointer"
                          >
                            {item}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-purple-455 uppercase tracking-[0.2em] mb-4">
                        Monitoring & Follow-up
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(searchResult.monitoring || []).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleInvestigationClick(item, searchResult.condition)}
                            className="px-5 py-2.5 bg-purple-950/20 text-purple-350 rounded-2xl text-[11px] font-bold border border-purple-500/10 hover:bg-purple-900/40 transition-colors flex items-center gap-2 group cursor-pointer"
                          >
                            {item}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-950 text-white p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/200/10 blur-[100px] rounded-full"></div>
                  <BrainCircuit className="w-12 h-12 text-emerald-500 mb-6" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">
                    Diagnostic Hub
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium italic">
                    "{searchResult.reasoning}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {[
            {
              title: 'The AKI Pattern',
              description: 'Acute Kidney Injury recognition and staging.',
              findings: [
                'Creatinine rise > 26μmol/L in 48h',
                'Urine output < 0.5ml/kg/h for 6h',
                'Hyperkalaemia (K+ > 5.5)'
              ],
              action: 'Fluid status assessment, stop nephrotoxics.',
              color: 'bg-rose-950/10 border-rose-500/10 text-rose-350 hover:bg-rose-900/20'
            },
            {
              title: 'Obstructive Jaundice',
              description: 'Biliary tree obstruction pattern.',
              findings: [
                'High Conjugated Bilirubin',
                'Marked ALP rise (>3x ULN)',
                'Pale stools, dark urine'
              ],
              action: 'Liver ultrasound, MRCP/ERCP.',
              color: 'bg-amber-955/10 border-amber-500/10 text-amber-350 hover:bg-amber-900/20'
            },
            {
              title: 'Sepsis Screen',
              description: 'Systemic inflammatory response pattern.',
              findings: ['Lactate > 2.0 mmol/L', 'WCC > 12 or < 4', 'CRP > 100 mg/L'],
              action: 'Sepsis 6: Blood cultures, IV fluids, Antibiotics.',
              color: 'bg-purple-95/10 border-purple-500/10 text-purple-350 hover:bg-purple-900/20'
            },
            {
              title: 'Heart Failure Pattern',
              description: 'Congestive failure recognition.',
              findings: [
                'High NT-proBNP',
                'CXR: Kerley B lines, Cardiomegaly',
                'Hyponatremia (dilutional)'
              ],
              action: 'Echocardiogram, Diuretics.',
              color: 'bg-blue-950/10 border-blue-500/10 text-blue-350 hover:bg-blue-900/20'
            },
            {
              title: 'DKA Triad',
              description: 'Diabetic Ketoacidosis diagnostic criteria.',
              findings: ['Glucose > 11.0 mmol/L', 'Ketones > 3.0 mmol/L', 'pH < 7.3 or HCO3 < 15'],
              action: 'Fixed rate insulin, IV fluids, K+ replacement.',
              color: 'bg-amber-955/10 border-amber-500/10 text-amber-350 hover:bg-amber-900/20'
            },
            {
              title: 'PE Pattern',
              description: 'Pulmonary Embolism diagnostic clues.',
              findings: [
                'High D-Dimer (if low/mod risk)',
                'ABG: Type 1 Respiratory Failure',
                'ECG: Sinus Tachycardia / S1Q3T3'
              ],
              action: 'CTPA or V/Q scan.',
              color: 'bg-slate-900/50 border-white/5 text-slate-350 hover:bg-slate-900'
            }
          ].map((pattern) => (
            <div
              key={pattern.title}
              onClick={() => handleInvestigationClick(pattern.title)}
              className={`p-8 rounded-[40px] border shadow-sm flex flex-col cursor-pointer transition-all group ${pattern.color}`}
            >
              <h3 className="text-lg font-black uppercase tracking-tight mb-2 flex items-center justify-between">
                {pattern.title}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[12px] font-medium opacity-80 mb-6">{pattern.description}</p>

              <div className="space-y-3 mb-8 flex-grow">
                {(pattern.findings || []).map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                    <span className="text-[11px] font-bold leading-tight">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                  Immediate Action
                </p>
                <p className="text-[11px] font-black">{pattern.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Investigation Detail Modal */}
      {selectedInvestigation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-900 w-full max-w-2xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                  {selectedInvestigation}
                </h3>
                {investigationDetails?.clinicalContext && (
                  <p className="text-slate-400 font-medium text-sm mt-1">
                    Context: {investigationDetails.clinicalContext}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedInvestigation(null);
                  setInvestigationDetails(null);
                }}
                className="p-3 hover:bg-slate-900 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
              >
                <Zap className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-10 max-h-[70vh] overflow-y-auto space-y-10">
              {isLoadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <div className="text-center">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                      Consulting Gemini...
                    </p>
                    <p className="text-slate-400 text-[9px] mt-1">
                      Fetching technique, findings, and interpretation
                    </p>
                  </div>
                </div>
              ) : investigationDetails ? (
                <>
                  <section>
                    <h4 className="text-[10px] font-black text-emerald-450 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Microscope className="w-4 h-4" />
                      Technique & Procedure
                    </h4>
                    <p className="text-slate-300 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                      {investigationDetails.technique}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-blue-455 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Findings (Normal vs. Abnormal)
                    </h4>
                    <p className="text-slate-300 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                      {investigationDetails.findings}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-purple-455 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4" />
                      Clinical Interpretation
                    </h4>
                    <p className="text-slate-300 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                      {investigationDetails.interpretation}
                    </p>
                  </section>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 font-medium">
                    Failed to load details. Please try again.
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-950/40 border-t border-white/5 flex justify-end">
              <button
                onClick={() => {
                  setSelectedInvestigation(null);
                  setInvestigationDetails(null);
                }}
                className="px-8 py-3 bg-slate-950 hover:bg-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default InvestigationHub;
export { InvestigationHub };
