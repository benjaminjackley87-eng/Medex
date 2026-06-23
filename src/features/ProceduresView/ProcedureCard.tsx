import React from 'react';
import {
  Wrench,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  PlayCircle,
  Plus,
  Trash2,
  X,
  Image as ImageIcon
} from 'lucide-react';
import MedImage from '../../components/common/MedImage';
import { Procedure, ProcedureStep } from '../../data/collections/proceduresData';

interface ProcedureCardProps {
  selectedProc: Procedure;
  isEditMode?: boolean;
  updateProc: (id: string, field: keyof Procedure, value: Procedure[keyof Procedure]) => void;
  updateProcImage: (id: string, file: File) => void;
  addListItem: (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare'
  ) => void;
  removeListItem: (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare',
    index: number
  ) => void;
  updateListItem: (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare',
    index: number,
    value: string
  ) => void;
  addStep: (id: string) => void;
  removeStep: (id: string, index: number) => void;
  updateStep: (id: string, index: number, field: keyof ProcedureStep, value: ProcedureStep[keyof ProcedureStep]) => void;
  updateStepImage: (id: string, index: number, file: File) => void;
  setEnlargedImage: (img: { src: string; alt: string } | null) => void;
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({
  selectedProc,
  isEditMode,
  updateProc,
  updateProcImage,
  addListItem,
  removeListItem,
  updateListItem,
  addStep,
  removeStep,
  updateStep,
  updateStepImage,
  setEnlargedImage
}) => {
  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="bg-slate-900 rounded-[40px] border border-white/5 shadow-sm p-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-slate-955 border border-white/5 rounded-3xl flex items-center justify-center shrink-0">
              <Wrench className="w-8 h-8 text-rose-400" />
            </div>
            <div className="flex-1">
              {isEditMode ? (
                <div className="space-y-2">
                  <input
                    value={selectedProc.name}
                    onChange={(e) => updateProc(selectedProc.id, 'name', e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-3xl font-black text-white uppercase tracking-tight outline-none focus:border-rose-500"
                    placeholder="Procedure Name"
                  />
                  <textarea
                    value={selectedProc.description}
                    onChange={(e) => updateProc(selectedProc.id, 'description', e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-slate-300 font-medium outline-none focus:border-rose-500"
                    placeholder="Description"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                    {selectedProc.name}
                  </h2>
                  <p className="text-slate-400 font-medium">{selectedProc.description}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            {isEditMode ? (
              <select
                value={selectedProc.category}
                onChange={(e) => updateProc(selectedProc.id, 'category', e.target.value)}
                className="px-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-350 outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Bedside">Bedside</option>
                <option value="Surgical">Surgical</option>
                <option value="Emergency">Emergency</option>
                <option value="Diagnostic">Diagnostic</option>
              </select>
            ) : (
              <div className="px-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                {selectedProc.category}
              </div>
            )}

            <MedImage
              src={
                !selectedProc.localImageUrl
                  ? selectedProc.imageUrl || '/assets/placeholders/procedure-main.svg'
                  : undefined
              }
              localId={selectedProc.localImageUrl}
              alt={selectedProc.name}
              label="Overview"
              fallbackIcon={<Wrench />}
              isEditMode={isEditMode}
              onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
              config={selectedProc.imageConfig || { size: 'sm', position: 'right' }}
              onUpdateConfig={(config) => updateProc(selectedProc.id, 'imageConfig', config)}
              onDelete={() => updateProc(selectedProc.id, 'localImageUrl', undefined)}
              onUpload={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e: Event) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) updateProcImage(selectedProc.id, file);
                };
                input.click();
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Indications
              </h3>
              {isEditMode && (
                <button
                  onClick={() => addListItem(selectedProc.id, 'indications')}
                  className="p-1 text-emerald-450 hover:bg-emerald-950/40 rounded-lg border border-emerald-550/10 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {selectedProc.indications.map((item, i) => (
                <li key={i} className="group/li flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-950/200 shrink-0" />
                  {isEditMode ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        value={item}
                        onChange={(e) =>
                          updateListItem(selectedProc.id, 'indications', i, e.target.value)
                        }
                        className="flex-1 bg-slate-950 border border-white/5 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-300 outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => removeListItem(selectedProc.id, 'indications', i)}
                        className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover/li:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-slate-300">{item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-550 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Contraindications
              </h3>
              {isEditMode && (
                <button
                  onClick={() => addListItem(selectedProc.id, 'contraindications')}
                  className="p-1 text-rose-450 hover:bg-rose-955/20 rounded-lg border border-rose-500/10 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <ul className="space-y-2">
              {selectedProc.contraindications.map((item, i) => (
                <li key={i} className="group/li flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-950/200 shrink-0" />
                  {isEditMode ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        value={item}
                        onChange={(e) =>
                          updateListItem(selectedProc.id, 'contraindications', i, e.target.value)
                        }
                        className="flex-1 bg-slate-950 border border-white/5 rounded-lg px-3 py-1.5 text-sm font-bold text-rose-350 outline-none focus:border-rose-500"
                      />
                      <button
                        onClick={() => removeListItem(selectedProc.id, 'contraindications', i)}
                        className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover/li:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-rose-355">{item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-slate-900 rounded-[40px] border border-white/5 p-10 text-white">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
            <PlayCircle className="w-6 h-6 text-rose-450" /> Procedure Steps
          </h3>
          {isEditMode && (
            <button
              onClick={() => addStep(selectedProc.id)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Step
            </button>
          )}
        </div>
        <div className="space-y-12 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-950/40/10" />
          {selectedProc.steps.map((step, i) => (
            <div key={i} className="relative pl-12 group/step">
              <div className="absolute left-0 top-0 w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-xs font-black border-4 border-slate-900 z-10">
                {i + 1}
              </div>
              {isEditMode && (
                <button
                  onClick={() => removeStep(selectedProc.id, i)}
                  className="absolute -top-2 -right-2 p-1.5 bg-slate-800 text-slate-400 hover:text-rose-400 rounded-full border border-white/10 opacity-0 group-hover/step:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  {isEditMode ? (
                    <div className="space-y-4">
                      <input
                        value={step.title}
                        onChange={(e) => updateStep(selectedProc.id, i, 'title', e.target.value)}
                        className="w-full bg-slate-950/40/5 border border-white/10 rounded-xl px-4 py-2 text-lg font-black uppercase tracking-tight text-rose-400 outline-none focus:border-rose-500"
                        placeholder="Step Title"
                      />
                      <textarea
                        value={step.description}
                        onChange={(e) =>
                          updateStep(selectedProc.id, i, 'description', e.target.value)
                        }
                        className="w-full bg-slate-950/40/5 border border-white/10 rounded-xl px-4 py-2 text-slate-400 font-medium outline-none focus:border-rose-500"
                        placeholder="Step Description"
                      />
                      <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Clinical Pearls
                        </div>
                        <textarea
                          value={step.pearls?.join('\n') || ''}
                          onChange={(e) =>
                            updateStep(selectedProc.id, i, 'pearls', e.target.value.split('\n'))
                          }
                          className="w-full bg-slate-950/40/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-blue-200 font-medium outline-none focus:border-rose-500"
                          placeholder="Enter pearls (one per line)..."
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-rose-400">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        {step.description}
                      </p>
                      {step.pearls && step.pearls.length > 0 && step.pearls[0] !== '' && (
                        <div className="mt-6 p-5 bg-blue-950/200/10 rounded-2xl border border-blue-500/20 flex items-start gap-4 shadow-lg shadow-blue-500/5">
                          <div className="shrink-0 mt-1 p-1.5 bg-blue-950/200/20 rounded-lg">
                            <Info className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-400/80 mb-1">
                              Clinical Pearls
                            </div>
                            {step.pearls.map((pearl, pi) => (
                              <p
                                key={pi}
                                className="text-[13px] text-blue-100 font-medium leading-relaxed italic"
                              >
                                {pearl}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="w-full md:w-1/3 shrink-0">
                  <MedImage
                    src={
                      !step.localImageUrl
                        ? step.imageUrl || '/assets/placeholders/procedure-step.svg'
                        : undefined
                    }
                    localId={step.localImageUrl}
                    alt={step.title}
                    label={`Step ${i + 1} Technique`}
                    fallbackIcon={<ImageIcon />}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                    isEditMode={isEditMode}
                    config={step.imageConfig || { size: 'md', position: 'right' }}
                    onUpdateConfig={(config) =>
                      updateStep(selectedProc.id, i, 'imageConfig', config)
                    }
                    onDelete={() => updateStep(selectedProc.id, i, 'localImageUrl', undefined)}
                    onUpload={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e: Event) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) updateStepImage(selectedProc.id, i, file);
                      };
                      input.click();
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complications & Aftercare */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[32px] border border-white/5 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Complications
            </h3>
            {isEditMode && (
              <button
                onClick={() => addListItem(selectedProc.id, 'complications')}
                className="p-1 text-amber-450 hover:bg-amber-955/40 rounded-lg border border-amber-500/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {selectedProc.complications.map((item, i) => (
              <li key={i} className="group/li flex items-center gap-2">
                {isEditMode ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateListItem(selectedProc.id, 'complications', i, e.target.value)
                      }
                      className="flex-1 p-3 bg-slate-950 border border-white/5 rounded-xl text-xs font-bold text-slate-300 outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => removeListItem(selectedProc.id, 'complications', i)}
                      className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover/li:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full p-3 bg-slate-955/40 border border-white/5 rounded-xl text-xs font-bold text-slate-300">
                    {item}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 rounded-[32px] border border-white/5 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" /> Aftercare
            </h3>
            {isEditMode && (
              <button
                onClick={() => addListItem(selectedProc.id, 'aftercare')}
                className="p-1 text-blue-450 hover:bg-blue-955/40 rounded-lg border border-blue-500/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {selectedProc.aftercare.map((item, i) => (
              <li key={i} className="group/li flex items-center gap-2">
                {isEditMode ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateListItem(selectedProc.id, 'aftercare', i, e.target.value)
                      }
                      className="flex-1 p-3 bg-slate-950 border border-white/5 rounded-xl text-xs font-bold text-slate-300 outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeListItem(selectedProc.id, 'aftercare', i)}
                      className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover/li:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full p-3 bg-slate-955/40 border border-white/5 rounded-xl text-xs font-bold text-slate-300">
                    {item}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
