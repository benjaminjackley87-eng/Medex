import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Search,
  Stethoscope,
  Syringe,
  Microscope,
  Info,
  Plus,
  Trash2,
  Save
} from 'lucide-react';
import { ACUTE_MANAGEMENT as INITIAL_ACUTE, AcuteManagementItem } from '../data/collections/acuteCare';
import { ClinicalCard } from '../components/ui/ClinicalCard';
import ImageModal from '../components/common/ImageModal';
import { useClinicalSearch } from '../hooks/useClinicalSearch';
import { storage } from '../services/storageService';
import MedImage from '../components/common/MedImage';

interface AcuteCareViewProps {
  isEditMode?: boolean;
}

export const AcuteCareView: React.FC<AcuteCareViewProps> = ({ isEditMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<AcuteManagementItem[]>(INITIAL_ACUTE);
  const [isDirty, setIsDirty] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const { results: filteredAcute, didYouMean } = useClinicalSearch(items, searchQuery, [
    'presentation'
  ]);

  const updateItem = (index: number, field: keyof AcuteManagementItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    setIsDirty(true);
  };

  const addItem = () => {
    setItems([
      ...items,
      { presentation: 'New Presentation', management: '', adjuncts: '', imaging: '' }
    ]);
    setIsDirty(true);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleSave = () => {
    // In a real app, we'd save to storage/API
    setIsDirty(false);
    alert('Changes saved locally for this session.');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-950/40 text-rose-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-rose-500/20">
            <Zap className="w-4 h-4" /> Pillar 3: Acute Care & Dx
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            Acute Management <span className="text-rose-550">Protocols</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-semibold">
            Rapid stabilization and adjunctive management regimens for acutely unwell medical and
            surgical presentations.
          </p>
        </div>
        {isEditMode && (
          <div className="flex items-center gap-4">
            <button
              onClick={addItem}
              className="btn-pill bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 shadow-lg shadow-rose-900/40 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Protocol
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`btn-pill flex items-center gap-2 cursor-pointer ${isDirty ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-12 relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="w-6 h-6 text-slate-450 group-focus-within:text-rose-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search presentations (e.g., Sepsis, Obstruction)..."
          className="w-full bg-slate-900 border-2 border-white/5 rounded-[32px] py-6 pl-16 pr-8 text-xl font-bold text-white focus:outline-none focus:border-rose-500/30 focus:ring-4 focus:ring-rose-500/5 transition-all shadow-sm"
        />
      </div>

      {didYouMean && (
        <div className="max-w-4xl mx-auto mb-8 flex justify-center">
          <button
            onClick={() => setSearchQuery(didYouMean)}
            className="flex items-center gap-2 px-6 py-3 bg-rose-950/40 hover:bg-rose-900/40 text-rose-450 border border-rose-500/20 rounded-2xl transition-all shadow-sm cursor-pointer"
          >
            <span className="text-xs font-black uppercase tracking-widest text-rose-400">
              Did you mean
            </span>
            <span className="text-sm font-bold border-b border-rose-600 border-dashed">
              {didYouMean}
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-rose-400">?</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {filteredAcute.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group"
          >
            {isEditMode && (
              <button
                onClick={() => removeItem(idx)}
                className="absolute -top-3 -right-3 p-2 bg-slate-900 text-slate-400 hover:text-rose-400 rounded-full shadow-lg border border-white/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {isEditMode ? (
              <div className="bento-card p-8 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <Zap className="w-6 h-6 text-rose-500" />
                  <input
                    value={item.presentation}
                    onChange={(e) => updateItem(idx, 'presentation', e.target.value)}
                    className="flex-1 bg-transparent text-2xl font-black text-white outline-none focus:text-rose-450"
                    placeholder="Presentation Name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-500">
                      <Stethoscope className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Management
                      </span>
                    </div>
                    <textarea
                      value={item.management}
                      onChange={(e) => updateItem(idx, 'management', e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 outline-none focus:border-rose-500/50 min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-450">
                      <Syringe className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Adjuncts
                      </span>
                    </div>
                    <textarea
                      value={item.adjuncts}
                      onChange={(e) => updateItem(idx, 'adjuncts', e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 outline-none focus:border-rose-500/50 min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Microscope className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Imaging
                      </span>
                    </div>
                    <textarea
                      value={item.imaging}
                      onChange={(e) => updateItem(idx, 'imaging', e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs font-bold text-slate-200 outline-none focus:border-rose-500/50 min-h-[100px]"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Protocol Visual Reference
                  </p>
                  <MedImage
                    src={
                      !item.localImageUrl
                        ? item.imageUrl || '/assets/placeholders/clinical-presentation.svg'
                        : undefined
                    }
                    localId={item.localImageUrl}
                    alt={item.presentation}
                    label="Clinical Visual"
                    fallbackIcon={<Zap />}
                    isEditMode={isEditMode}
                    onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
                    config={{ size: 'md', position: 'right' }}
                    onDelete={() => {
                      updateItem(idx, 'localImageUrl', undefined);
                      updateItem(idx, 'imageUrl', undefined);
                    }}
                    onUpload={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = async (e: Event) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (!file) return;
                        const assetId = `acute_${Math.random().toString(36).substr(2, 9)}`;
                        const url = await storage.saveAsset(assetId, file);
                        updateItem(idx, 'localImageUrl', url);
                      };
                      input.click();
                    }}
                  />
                </div>
              </div>
            ) : (
              <ClinicalCard
                title={item.presentation}
                icon={Zap}
                headerColorClass="bg-rose-950/30"
                imageUrl={item.imageUrl || '/assets/placeholders/clinical-presentation.svg'}
                localImageUrl={item.localImageUrl}
                details={[
                  {
                    label: 'Management',
                    content: item.management,
                    icon: Stethoscope,
                    labelColorClass: 'text-amber-500'
                  },
                  {
                    label: 'Adjuncts',
                    content: item.adjuncts,
                    icon: Syringe,
                    labelColorClass: 'text-blue-450'
                  },
                  {
                    label: 'Imaging & Review',
                    content: item.imaging,
                    icon: Microscope,
                    labelColorClass: 'text-indigo-400'
                  }
                ]}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-16 p-8 bg-slate-900 rounded-[32px] text-white/50 text-[10px] font-medium leading-relaxed border border-white/5">
        <p className="flex items-center gap-2 mb-2 text-white/80 font-black uppercase tracking-widest">
          <Info className="w-3 h-3" /> Clinical Decision Support Disclaimer
        </p>
        These protocols are for educational purposes and junior doctor decision support. They
        represent common Australian clinical practice. Always verify management plans with senior
        clinicians and current local hospital guidelines before application.
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

export default AcuteCareView;
