import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  BookOpen,
  GraduationCap,
  FolderArchive,
  Terminal,
  Zap,
  Microscope,
  Activity,
  Pill,
  Layers,
  Command,
  ChevronRight
} from 'lucide-react';
import { AppView, Examination, ExamSystem } from '../../types';
import { localSearchService, SearchDocument, SearchResult } from '../../services/localSearchService';
import FoundationalDetailModal from './FoundationalDetailModal';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView, system?: ExamSystem | null, exam?: Examination | null) => void;
  exams: Examination[];
}

const PAGE_SIZE = 5;

type ResultItem =
  | { id: string; label: string; icon: React.ReactNode; view: AppView }
  | (Examination & { isExam: true })
  | (SearchDocument & { isFoundational: true });

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate, exams }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [foundationalResults, setFoundationalResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<SearchDocument | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const views = [
    {
      id: 'library',
      label: 'Repository',
      icon: <BookOpen className="w-4 h-4" />,
      view: 'library' as AppView
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <GraduationCap className="w-4 h-4" />,
      view: 'dashboard' as AppView
    },
    {
      id: 'vault',
      label: 'Knowledge Vault',
      icon: <FolderArchive className="w-4 h-4" />,
      view: 'vault' as AppView
    },
    {
      id: 'glossary',
      label: 'Glossary',
      icon: <Terminal className="w-4 h-4" />,
      view: 'glossary' as AppView
    },
    {
      id: 'correlation',
      label: 'Correlation',
      icon: <Zap className="w-4 h-4" />,
      view: 'correlation' as AppView
    },
    {
      id: 'finder',
      label: 'Clinical Finder',
      icon: <Microscope className="w-4 h-4" />,
      view: 'finder' as AppView
    },
    {
      id: 'investigations',
      label: 'Investigation Hub',
      icon: <Activity className="w-4 h-4" />,
      view: 'investigations' as AppView
    },
    {
      id: 'therapeuticNavigator',
      label: 'Therapeutics',
      icon: <Zap className="w-4 h-4" />,
      view: 'therapeuticNavigator' as AppView
    },
    {
      id: 'pharmacology',
      label: 'Pharmacology',
      icon: <Pill className="w-4 h-4" />,
      view: 'pharmacology' as AppView
    },
    {
      id: 'dermRevisor',
      label: 'Derm Revisor',
      icon: <Layers className="w-4 h-4" />,
      view: 'dermRevisor' as AppView
    }
  ];

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setFoundationalResults([]);
      setSelectedDoc(null);
    }
  }

  const filteredViews = useMemo(() =>
    views.filter((v) => v.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const filteredExams = useMemo(() =>
    exams
      .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5),
    [exams, query]
  );

  const standardResults = useMemo(() =>
    [...filteredViews, ...filteredExams.map((e) => ({ ...e, isExam: true as const }))],
    [filteredViews, filteredExams]
  );

  const results = useMemo<ResultItem[]>(() => [
    ...standardResults,
    ...foundationalResults.map((r) => ({ ...r.document, isFoundational: true as const }))
  ], [standardResults, foundationalResults]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
    if (newQuery.trim().length > 1) {
      const res = localSearchService.search(newQuery, 1, PAGE_SIZE);
      setFoundationalResults(res.results);
      setCurrentPage(1);
      setTotalResults(res.totalResults);
      setHasMore(res.hasMore);
    } else {
      setFoundationalResults([]);
      setTotalResults(0);
      setHasMore(false);
    }
  };

  // Load next page
  const loadNextPage = () => {
    if (!hasMore) return;
    const nextPage = currentPage + 1;
    const res = localSearchService.search(query, nextPage, PAGE_SIZE);
    setFoundationalResults((prev) => [...prev, ...res.results]);
    setCurrentPage(nextPage);
    setHasMore(res.hasMore);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || selectedDoc) return; // Ignore if detail modal is open

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          if ('isExam' in selected) {
            onNavigate('library', null, selected as unknown as Examination);
            onClose();
          } else if ('isFoundational' in selected) {
            setSelectedDoc(selected as unknown as SearchDocument);
          } else if ('view' in selected) {
            onNavigate(selected.view);
            onClose();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onNavigate, onClose, selectedDoc]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />

        <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl shadow-black overflow-hidden animate-in zoom-in-95 slide-in-from-top-8 duration-300 flex flex-col max-h-[75vh]">
          {/* Input Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-950/50">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search pages, protocols, or foundational sciences (e.g. AcetylCoa)..."
              className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-100 placeholder:text-slate-400"
            />
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] font-black text-slate-400 uppercase">ESC</span>
            </div>
          </div>

          {/* Results Container */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-900">
            {results.length > 0 ? (
              <div className="space-y-6">
                {/* Navigation and Tools */}
                {filteredViews.length > 0 && (
                  <div>
                    <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                      Navigation & Tools
                    </p>
                    <div className="space-y-1">
                      {filteredViews.map((view, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={view.id}
                            onClick={() => {
                              onNavigate(view.view);
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-slate-950/40/20' : 'bg-slate-800 border border-slate-700/50 text-slate-400'}`}
                              >
                                {view.icon}
                              </div>
                              <span className="font-bold text-sm tracking-tight">{view.label}</span>
                            </div>
                            {isSelected && <Command className="w-3.5 h-3.5 opacity-60" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Protocols */}
                {filteredExams.length > 0 && (
                  <div>
                    <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                      Clinical Protocols
                    </p>
                    <div className="space-y-1">
                      {filteredExams.map((exam, idx) => {
                        const actualIdx = filteredViews.length + idx;
                        const isSelected = actualIdx === selectedIndex;
                        return (
                          <button
                            key={exam.id}
                            onClick={() => {
                              onNavigate('library', null, exam);
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(actualIdx)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-slate-950/40/20' : 'bg-slate-800 border border-slate-700/50 text-slate-400'}`}
                              >
                                <BookOpen className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <span className="font-bold text-sm tracking-tight block">
                                  {exam.name}
                                </span>
                                <span
                                  className={`text-[10px] font-medium block ${isSelected ? 'text-white/60' : 'text-slate-400'}`}
                                >
                                  {exam.system}
                                </span>
                              </div>
                            </div>
                            {isSelected && <Command className="w-3.5 h-3.5 opacity-60" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Foundational Sciences (Layer 1 & 2 JSON files) */}
                {foundationalResults.length > 0 && (
                  <div>
                    <div className="px-4 flex items-center justify-between mb-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Foundational Sciences (Layer 1 & 2)
                      </p>
                      <span className="text-[9px] font-black px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-md">
                        {foundationalResults.length} of {totalResults}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {foundationalResults.map((res, idx) => {
                        const actualIdx = standardResults.length + idx;
                        const isSelected = actualIdx === selectedIndex;
                        const doc = res.document;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDoc(doc)}
                            onMouseEnter={() => setSelectedIndex(actualIdx)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-4 overflow-hidden">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-slate-950/40/20'
                                    : 'bg-slate-800 border border-slate-700/50 text-slate-400'
                                }`}
                              >
                                {doc.type === 'concept' ? (
                                  <Activity className="w-4 h-4 text-indigo-400" />
                                ) : doc.type === 'structure' ? (
                                  <Layers className="w-4 h-4 text-emerald-400" />
                                ) : doc.type === 'correlation' ? (
                                  <Zap className="w-4 h-4 text-rose-400" />
                                ) : (
                                  <BookOpen className="w-4 h-4 text-blue-400" />
                                )}
                              </div>
                              <div className="overflow-hidden">
                                <span className="font-bold text-sm tracking-tight block truncate">
                                  {doc.title}
                                </span>
                                <span
                                  className={`text-[10px] font-medium block truncate ${isSelected ? 'text-white/60' : 'text-slate-400'}`}
                                >
                                  {doc.subtitle}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 shrink-0 opacity-60" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Pagination - Load More */}
                    {hasMore && (
                      <div className="px-4 pt-2">
                        <button
                          onClick={loadNextPage}
                          className="w-full py-2 bg-slate-800/50 border border-slate-800 hover:bg-slate-800 hover:border-slate-750 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          Load More Results ({totalResults - foundationalResults.length} remaining)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-400 font-bold text-sm">No results found for "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 shadow-sm">
                  <span className="text-[9px] font-black text-slate-400">↑↓</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 shadow-sm">
                  <span className="text-[9px] font-black text-slate-400">↵</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Select / Open
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                MedEx Nexus v4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Foundational Science Detail Modal */}
      <FoundationalDetailModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};

export default CommandPalette;
