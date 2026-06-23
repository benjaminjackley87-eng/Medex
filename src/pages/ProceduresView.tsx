import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Wrench, Plus, Save } from 'lucide-react';
import ImageModal from '../components/common/ImageModal';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import { storage } from '../services/storageService';
import { Procedure, ProcedureStep, INITIAL_PROCEDURES } from '../data/collections/proceduresData';

import { ProcedureSidebar } from '../features/ProceduresView/ProcedureSidebar';
import { ProcedureCard } from '../features/ProceduresView/ProcedureCard';

interface ProceduresViewProps {
  isEditMode?: boolean;
}

export const ProceduresView: React.FC<ProceduresViewProps> = ({ isEditMode }) => {
  const [procedures, setProcedures] = useState<Procedure[]>(INITIAL_PROCEDURES);
  const [activeProc, setActiveProc] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const { results: filteredProcs, didYouMean } = useClinicalSearch(procedures, searchQuery, [
    'name',
    'category'
  ]);

  const selectedProc = useMemo(() => {
    return procedures.find((p) => p.id === activeProc);
  }, [activeProc, procedures]);

  const handleSave = () => {
    setIsDirty(false);
    alert('Changes saved locally for this session.');
  };

  const updateProc = (id: string, field: keyof Procedure, value: any) => {
    setProcedures((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setIsDirty(true);
  };

  const addProc = () => {
    const newId = `proc-${Math.random().toString(36).substr(2, 9)}`;
    const newProc: Procedure = {
      id: newId,
      name: 'New Procedure',
      category: 'Bedside',
      description: 'Describe the procedure...',
      indications: [],
      contraindications: [],
      equipment: [],
      steps: [],
      complications: [],
      aftercare: []
    };
    setProcedures((prev) => [...prev, newProc]);
    setActiveProc(newId);
    setIsDirty(true);
  };

  const removeProc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProcedures((prev) => prev.filter((p) => p.id !== id));
    if (activeProc === id) setActiveProc(null);
    setIsDirty(true);
  };

  const addListItem = (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare'
  ) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: [...p[field], 'New Item'] };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const removeListItem = (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare',
    index: number
  ) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newList = [...p[field]];
          newList.splice(index, 1);
          return { ...p, [field]: newList };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const updateListItem = (
    id: string,
    field: 'indications' | 'contraindications' | 'equipment' | 'complications' | 'aftercare',
    index: number,
    value: string
  ) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newList = [...p[field]];
          newList[index] = value;
          return { ...p, [field]: newList };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const addStep = (id: string) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            steps: [...p.steps, { title: 'New Step', description: 'Step description...' }]
          };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const removeStep = (id: string, index: number) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newSteps = [...p.steps];
          newSteps.splice(index, 1);
          return { ...p, steps: newSteps };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const updateStep = (id: string, index: number, field: keyof ProcedureStep, value: any) => {
    setProcedures((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newSteps = [...p.steps];
          newSteps[index] = { ...newSteps[index], [field]: value };
          return { ...p, steps: newSteps };
        }
        return p;
      })
    );
    setIsDirty(true);
  };

  const updateProcImage = async (id: string, file: File) => {
    const assetId = `proc_${id}_${Math.random().toString(36).substr(2, 9)}`;
    const url = await storage.saveAsset(assetId, file);
    updateProc(id, 'localImageUrl', url);
  };

  const updateStepImage = async (id: string, index: number, file: File) => {
    const assetId = `proc_step_${id}_${index}_${Math.random().toString(36).substr(2, 9)}`;
    const url = await storage.saveAsset(assetId, file);
    updateStep(id, index, 'localImageUrl', url);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-955/20 text-rose-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-rose-500/20">
          <Wrench className="w-4 h-4" /> Procedural Skills
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              Clinical <span className="text-rose-455">Procedures</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl font-medium">
              Step-by-step guides, indications, and safety protocols for essential bedside and
              emergency procedures.
            </p>
          </div>
          {isEditMode && (
            <div className="flex items-center gap-4">
              <button
                onClick={addProc}
                className="btn-pill bg-rose-600 text-white flex items-center gap-2 shadow-lg shadow-rose-950/50 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Procedure
              </button>
              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`btn-pill flex items-center gap-2 cursor-pointer ${isDirty ? 'bg-emerald-650 text-white shadow-lg shadow-emerald-950/50' : 'bg-slate-950 text-slate-400 border border-white/5'}`}
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar List */}
        <div className="lg:col-span-4">
          <ProcedureSidebar
            procedures={procedures}
            activeProc={activeProc}
            setActiveProc={setActiveProc}
            filteredProcs={filteredProcs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            didYouMean={didYouMean}
            isEditMode={isEditMode}
            removeProc={removeProc}
          />
        </div>

        {/* Procedure Display */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedProc ? (
              <motion.div
                key={selectedProc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ProcedureCard
                  selectedProc={selectedProc}
                  isEditMode={isEditMode}
                  updateProc={updateProc}
                  updateProcImage={updateProcImage}
                  addListItem={addListItem}
                  removeListItem={removeListItem}
                  updateListItem={updateListItem}
                  addStep={addStep}
                  removeStep={removeStep}
                  updateStep={updateStep}
                  updateStepImage={updateStepImage}
                  setEnlargedImage={setEnlargedImage}
                />
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] bg-slate-900/20 rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-905/60 border border-white/5 rounded-3xl flex items-center justify-center shadow-sm mb-6">
                  <Wrench className="w-10 h-10 text-slate-550" />
                </div>
                <h3 className="text-xl font-black text-slate-350 tracking-tight mb-2 uppercase">
                  Select a Procedure
                </h3>
                <p className="text-slate-400 text-sm max-w-xs font-medium">
                  Choose a clinical procedure from the list to view step-by-step guidance and safety
                  protocols.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

export default ProceduresView;
