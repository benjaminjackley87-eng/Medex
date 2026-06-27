import React from 'react';
import { motion } from 'motion/react';
import { Activity, ChevronRight } from 'lucide-react';
import { DrugMapping } from '../../../types';

interface SuggestedDrugsListProps {
  searchQuery: string;
  suggestedDrugs: DrugMapping[];
  onSelectDrug: (drugName: string) => void;
}

export const SuggestedDrugsList: React.FC<SuggestedDrugsListProps> = ({
  searchQuery,
  suggestedDrugs,
  onSelectDrug
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <h2 className="text-3xl font-black text-white flex items-center gap-4">
        <div className="bg-emerald-100 p-2 rounded-xl">
          <Activity className="w-8 h-8 text-emerald-600" />
        </div>
        Therapeutic Guidelines: {searchQuery}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(suggestedDrugs || []).map((mapping, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-slate-950/40 border border-white/5 rounded-[40px] p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => onSelectDrug(mapping.drug_name)}
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                  mapping.line_of_treatment === '1st line'
                    ? 'bg-emerald-100 text-emerald-400'
                    : mapping.line_of_treatment === '2nd line'
                      ? 'bg-amber-100 text-amber-400'
                      : 'bg-slate-900 text-slate-400'
                }`}
              >
                {mapping.line_of_treatment}
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-600 transition-colors">
              {mapping.drug_name}
            </h3>
            <p className="text-sm text-slate-400 font-bold mb-6 tracking-wide">
              {mapping.therapeutic_class}
            </p>
            {mapping.note && (
              <div className="relative pt-6 border-t border-white/5">
                <p className="text-sm text-slate-400 leading-relaxed italic font-medium">
                  {mapping.note}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
