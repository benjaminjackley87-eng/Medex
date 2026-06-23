import React from 'react';
import { X, BookOpen, Layers, Activity, Zap, ShieldAlert } from 'lucide-react';
import { SearchDocument } from '../../services/localSearchService';
import { loadAllAppliedAnatomyModules } from '../../data/collections/appliedAnatomyLoader';
import { renderFullContent, renderBlockMath, parseContentText } from '../../utils/latexTextParser';

interface FoundationalDetailModalProps {
  document: SearchDocument | null;
  onClose: () => void;
}

// Specialized renderer for RoteData values to extract formulas and handle objects
// Specialized renderer for RoteData values to extract formulas and handle objects
const renderRoteOrRelationValue = (value: any, keyName: string) => {
  if (typeof value === 'object' && value !== null) {
    if ('formulaName' in value && 'equation' in value) {
      const f = value as any;
      return (
        <div className="space-y-4 w-full">
          <div className="py-2.5 bg-slate-950/80 rounded-xl border border-slate-800/20 flex justify-center overflow-x-auto px-4">
            {renderBlockMath(f.equation)}
          </div>

          {f.useCaseExample && (
            <div className="space-y-1">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                Clinical Use Case
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {f.useCaseExample}
              </p>
            </div>
          )}

          {f.variablesExplanation && Object.keys(f.variablesExplanation).length > 0 && (
            <div className="space-y-1">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                Variables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {Object.entries(f.variablesExplanation).map(([vKey, vVal]) => (
                  <div
                    key={vKey}
                    className="bg-slate-950/20 border border-slate-900/30 p-1.5 rounded-lg flex items-start gap-2"
                  >
                    <code className="text-[10px] font-bold text-blue-400 bg-slate-950/40 px-1.5 py-0.5 rounded">
                      {vKey}
                    </code>
                    <span className="text-[10px] text-slate-400 font-medium leading-tight">
                      {vVal as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {f.resultInterpretation && (
            <div className="space-y-1 bg-slate-950/20 border border-slate-800/40 p-2.5 rounded-xl">
              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block">
                Result Interpretation
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {f.resultInterpretation}
              </p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-3 mt-2 pl-3 border-l-2 border-slate-800">
        {Object.entries(value).map(([subKey, subVal]) => (
          <div key={subKey} className="text-xs text-slate-300 font-medium">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mr-2">
              {subKey.replace(/_/g, ' ')}:
            </span>
            <div className="mt-1 text-slate-200">{renderRoteOrRelationValue(subVal, subKey)}</div>
          </div>
        ))}
      </div>
    );
  }

  const strVal = String(value);

  if (strVal.includes('\\') && /\bwhere\b/.test(strVal)) {
    const parts = strVal.split(/\bwhere\b/);
    const formula = parts[0].trim();
    const explanation = parts.slice(1).join('where').trim();

    return (
      <div className="space-y-2">
        {renderBlockMath(formula)}
        <p className="text-xs text-slate-400 leading-relaxed font-medium bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-2">
            Where:
          </span>
          {parseContentText(explanation)}
        </p>
      </div>
    );
  }

  // Auto-detect math equations even if they don't have wrappers
  if (strVal.includes('\\') && !strVal.includes('$')) {
    return renderBlockMath(strVal);
  }

  return <span className="text-slate-200">{parseContentText(strVal)}</span>;
};

const FoundationalDetailModal: React.FC<FoundationalDetailModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  const allModules = loadAllAppliedAnatomyModules();
  const currentModule = allModules.find((m) => m.moduleId === document.moduleId);

  let conceptData: any = null;
  let structureData: any = null;
  let correlations: any[] = [];

  if (currentModule) {
    if (document.type === 'concept' || document.id.startsWith('corr_concept_')) {
      const targetId = document.id.startsWith('corr_concept_')
        ? document.id.split('_')[2]
        : document.id.replace('concept_', '');

      conceptData = currentModule.concepts?.find((c) => c.conceptId === targetId);
      correlations = conceptData?.clinicalAndAnaestheticCorrelations || [];
    } else if (document.type === 'structure' || document.id.startsWith('corr_structure_')) {
      const targetId = document.id.startsWith('corr_structure_')
        ? document.id.split('_')[2]
        : document.id.replace('structure_', '');

      structureData = currentModule.structures?.find((s) => s.structureId === targetId);
      correlations = structureData?.clinicalAndAnaestheticCorrelations || [];
    }
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl shadow-black overflow-hidden animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col text-slate-100 font-sans">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              {document.type === 'concept' ? (
                <Activity className="w-6 h-6" />
              ) : (
                <Layers className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">
                {document.subtitle}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase mt-1">
                {document.title}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                Module ID: {document.moduleId} • {currentModule?.moduleTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-900">
          {/* Tags */}
          {currentModule?.tags && (
            <div className="flex flex-wrap gap-2">
              {currentModule.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-slate-800 border border-slate-700/50 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Render Concept Detail (Layer 2) */}
          {conceptData && (
            <div className="space-y-8">
              {/* Rote Data */}
              {conceptData.roteData && (
                <div className="p-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> Key Biophysical Properties
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium text-slate-300">
                    {Object.entries(conceptData.roteData).map(([key, value]) => {
                      const isFormula =
                        typeof value === 'object' && value !== null && 'formulaName' in value;
                      return (
                        <div
                          key={key}
                          className={`space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-850 flex flex-col justify-between ${
                            isFormula ? 'col-span-1 md:col-span-2' : ''
                          }`}
                        >
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                            {isFormula ? (value as any).formulaName : key.replace(/_/g, ' ')}
                          </span>
                          <div className="mt-1">{renderRoteOrRelationValue(value, key)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Tests */}
              {conceptData.specialTests && conceptData.specialTests.length > 0 && (
                <div className="p-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" /> Special Provocative Tests
                  </h3>
                  <div className="space-y-6">
                    {conceptData.specialTests.map((test: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-slate-900/50 border border-slate-850 p-5 rounded-xl space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800/40 pb-2">
                          <h4 className="text-sm font-black text-white uppercase tracking-tight">
                            {test.testName}
                          </h4>
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            OSCE Spec
                          </span>
                        </div>

                        <div className="text-xs text-slate-350 leading-relaxed font-medium">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                            Use Case / Indication
                          </span>
                          {test.useCaseExample}
                        </div>

                        <div className="text-xs text-slate-355 leading-relaxed font-medium bg-slate-950/30 p-3 rounded-lg border border-slate-800/40">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                            Procedure / Method
                          </span>
                          <p className="whitespace-pre-line leading-relaxed">{test.method}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-red-950/10 border-l-4 border-red-500 rounded-r-xl">
                            <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block mb-1">
                              Positive Findings
                            </span>
                            <p className="text-xs font-medium text-slate-300">
                              {test.findingsInterpretation.positive}
                            </p>
                          </div>
                          <div className="p-3 bg-emerald-950/10 border-l-4 border-emerald-500 rounded-r-xl">
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
                              Negative Findings
                            </span>
                            <p className="text-xs font-medium text-slate-300">
                              {test.findingsInterpretation.negative}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-slate-350 leading-relaxed font-medium border-t border-slate-800/40 pt-3">
                          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                            Clinical Significance & Diagnostics
                          </span>
                          {test.clinicalRelevance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* First-Principles Mechanics */}
              {conceptData.firstPrinciplesMechanics && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> First-Principles Mechanics
                  </h3>
                  <div className="text-sm leading-relaxed text-slate-300 space-y-6 font-medium bg-slate-950/20 p-8 rounded-[24px] border border-slate-800/50 shadow-inner">
                    {typeof conceptData.firstPrinciplesMechanics === 'string'
                      ? renderFullContent(conceptData.firstPrinciplesMechanics, 'first-principles')
                      : Object.entries(conceptData.firstPrinciplesMechanics).map(([key, val]) => (
                          <div
                            key={key}
                            className="space-y-3 border-b border-slate-800/30 pb-6 last:border-0 last:pb-0"
                          >
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <div className="text-slate-300 leading-relaxed">
                              {renderFullContent(String(val), key)}
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Render Structure Detail (Layer 1) */}
          {structureData && (
            <div className="space-y-8">
              {/* Surface Relations */}
              {structureData.surfaceLandmarksAndRelations && (
                <div className="p-6 bg-slate-950/40 border border-slate-800/80 rounded-2xl space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> Spatial Relations & Limits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium text-slate-300">
                    {Object.entries(structureData.surfaceLandmarksAndRelations).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-850 flex flex-col justify-between"
                        >
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                            {key}
                          </span>
                          <div className="mt-1">{renderRoteOrRelationValue(value, key)}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Anatomy details */}
              <div className="space-y-6">
                {structureData.macroAnatomy && (
                  <div className="bg-slate-950/20 p-8 rounded-[24px] border border-slate-800/50 space-y-2 shadow-inner">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">
                      Macroanatomy
                    </span>
                    <div className="text-sm text-slate-300 leading-relaxed font-medium">
                      {renderFullContent(structureData.macroAnatomy.description, 'macro')}
                    </div>
                  </div>
                )}
                {structureData.microAnatomyAndHistology && (
                  <div className="bg-slate-950/20 p-8 rounded-[24px] border border-slate-800/50 space-y-4 shadow-inner">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">
                      Microanatomy & Histology
                    </span>
                    {Object.entries(structureData.microAnatomyAndHistology).map(([key, value]) => (
                      <div
                        key={key}
                        className="text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/30 p-4 rounded-xl border border-slate-850"
                      >
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        {renderFullContent(String(value), key)}
                      </div>
                    ))}
                  </div>
                )}
                {(structureData.bloodSupply || structureData.innervation) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {structureData.bloodSupply && (
                      <div className="bg-slate-950/20 p-8 rounded-[24px] border border-slate-800/50 space-y-4 shadow-inner">
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block">
                          Vascular / Blood Supply
                        </span>
                        {Object.entries(structureData.bloodSupply).map(([k, v]) => (
                          <div
                            key={k}
                            className="text-xs text-slate-300 font-medium bg-slate-900/30 p-4 rounded-xl border border-slate-850"
                          >
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                              {k}:
                            </span>
                            {renderFullContent(String(v), k)}
                          </div>
                        ))}
                      </div>
                    )}
                    {structureData.innervation && (
                      <div className="bg-slate-950/20 p-8 rounded-[24px] border border-slate-800/50 space-y-4 shadow-inner">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
                          Innervation
                        </span>
                        {Object.entries(structureData.innervation).map(([k, v]) => (
                          <div
                            key={k}
                            className="text-xs text-slate-300 font-medium bg-slate-900/30 p-4 rounded-xl border border-slate-850"
                          >
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                              {k}:
                            </span>
                            {renderFullContent(String(v), k)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clinical Correlations Section */}
          {correlations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Clinical & Anaesthetic
                Correlations
              </h3>
              <div className="space-y-4">
                {correlations.map((corr, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-950/40 border border-slate-850 rounded-2xl space-y-3 relative overflow-hidden group hover:border-rose-500/30 transition-colors"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-950/200" />
                    <h4 className="text-sm font-black text-white uppercase tracking-wide">
                      {corr.scenario}
                    </h4>
                    <div className="text-xs text-slate-300 leading-relaxed font-medium">
                      {renderFullContent(corr.anatomicalBasis, `corr-${idx}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cross Reference Keys */}
          {currentModule?.crossReferenceKeys && (
            <div className="space-y-2 pt-4 border-t border-slate-800/80">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                Cross-References
              </span>
              <div className="flex flex-wrap gap-2">
                {currentModule.crossReferenceKeys.map((key) => (
                  <span
                    key={key}
                    className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded-md text-[10px] font-bold"
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
          <span>Tauri Local Secure Index</span>
          <span>Layer {document.moduleId.startsWith('cell') ? '2' : '1'} Module Detail</span>
        </div>
      </div>
    </div>
  );
};

export default FoundationalDetailModal;
