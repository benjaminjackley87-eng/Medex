import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Pill, AlertTriangle, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { DrugInfo, DrugMapping } from '../types';
import {
  HeroSearchSection,
  SuggestedDrugsList,
  DrugHeaderCard,
  PharmacologyCards,
  ClinicalDosaging,
  SidebarInfo
} from '../features/GenericPharmacology/components';

export const GenericPharmacologyView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'drug' | 'condition'>('drug');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);
  const [suggestedDrugs, setSuggestedDrugs] = useState<DrugMapping[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSelectedDrug(null);
    setSuggestedDrugs([]);

    try {
      if (searchType === 'drug') {
        const info = await geminiService.getDrugInfo(searchQuery);
        setSelectedDrug(info);
      } else {
        const mappings = await geminiService.getDrugsForCondition(searchQuery);
        setSuggestedDrugs(mappings);
      }

      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== searchQuery.toLowerCase());
        return [searchQuery, ...filtered].slice(0, 5);
      });
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to retrieve pharmacology data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestedDrug = async (drugName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const info = await geminiService.getDrugInfo(drugName);
      setSelectedDrug(info);
      setSearchType('drug');
      setSearchQuery(drugName);
    } catch (err) {
      console.error('Select suggested drug failed:', err);
      setError('Failed to load drug detailed information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/20 pb-20">
      <HeroSearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        isLoading={isLoading}
        handleSearch={handleSearch}
        recentSearches={recentSearches}
      />

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-rose-950/20 border-2 border-rose-950/30 p-8 rounded-[32px] flex items-center gap-6 text-rose-455 shadow-lg shadow-rose-100"
            >
              <div className="bg-rose-100 p-3 rounded-2xl">
                <AlertTriangle className="w-8 h-8 shrink-0" />
              </div>
              <p className="font-bold text-lg">{error}</p>
            </motion.div>
          )}

          {isLoading && !selectedDrug && suggestedDrugs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-slate-400"
            >
              <div className="relative mb-8">
                <Loader2 className="w-16 h-16 animate-spin text-indigo-500" />
                <Pill className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xl font-bold text-slate-400 tracking-tight">
                Retrieving pharmacology data from QLD Health & AMH...
              </p>
            </motion.div>
          )}

          {suggestedDrugs?.length > 0 && !selectedDrug && (
            <SuggestedDrugsList
              searchQuery={searchQuery}
              suggestedDrugs={suggestedDrugs}
              onSelectDrug={handleSelectSuggestedDrug}
            />
          )}

          {selectedDrug && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <DrugHeaderCard drug={selectedDrug} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Dynamics & Mechanism */}
                <div className="lg:col-span-2 space-y-12">
                  <PharmacologyCards drug={selectedDrug} />
                  <ClinicalDosaging drug={selectedDrug} />
                </div>

                {/* Right Column: Sidebar Info */}
                <SidebarInfo drug={selectedDrug} />
              </div>
            </motion.div>
          )}

          {!selectedDrug && suggestedDrugs.length === 0 && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center text-slate-300"
            >
              <div className="bg-slate-900 p-8 rounded-full mb-8">
                <Search className="w-20 h-20 opacity-20" />
              </div>
              <p className="text-2xl font-black text-slate-400 tracking-tight">
                Enter a drug or condition to begin
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GenericPharmacologyView;
