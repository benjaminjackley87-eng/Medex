import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AppView, Examination, ExamSystem } from '../../types';
import {
  localSearchService,
  SearchDocument,
  SearchResult
} from '../../services/localSearchService';
import FoundationalDetailModal from './FoundationalDetailModal';
import ViewResult from './CommandPalette/ViewResult';
import ProtocolResult from './CommandPalette/ProtocolResult';
import FoundationalResult from './CommandPalette/FoundationalResult';
import { COMMAND_VIEWS } from './CommandPalette/constants';
import CommandPaletteInput from './CommandPalette/CommandPaletteInput';
import CommandPaletteEmpty from './CommandPalette/CommandPaletteEmpty';
import CommandPaletteFooter from './CommandPalette/CommandPaletteFooter';

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

  const filteredViews = useMemo(
    () => COMMAND_VIEWS.filter((v) => v.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const filteredExams = useMemo(
    () => exams.filter((e) => e.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [exams, query]
  );

  const standardResults = useMemo(
    () => [...filteredViews, ...filteredExams.map((e) => ({ ...e, isExam: true as const }))],
    [filteredViews, filteredExams]
  );

  const results = useMemo<ResultItem[]>(
    () => [
      ...standardResults,
      ...foundationalResults.map((r) => ({ ...r.document, isFoundational: true as const }))
    ],
    [standardResults, foundationalResults]
  );

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
          <CommandPaletteInput
            inputRef={inputRef}
            query={query}
            onQueryChange={handleQueryChange}
          />

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
                          <ViewResult
                            key={view.id}
                            view={view}
                            isSelected={isSelected}
                            onClick={() => {
                              onNavigate(view.view);
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          />
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
                          <ProtocolResult
                            key={exam.id}
                            exam={exam}
                            isSelected={isSelected}
                            onClick={() => {
                              onNavigate('library', null, exam);
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(actualIdx)}
                          />
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
                          <FoundationalResult
                            key={doc.id}
                            doc={doc}
                            isSelected={isSelected}
                            onClick={() => setSelectedDoc(doc)}
                            onMouseEnter={() => setSelectedIndex(actualIdx)}
                          />
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
              <CommandPaletteEmpty query={query} />
            )}
          </div>

          <CommandPaletteFooter />
        </div>
      </div>

      {/* Foundational Science Detail Modal */}
      <FoundationalDetailModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};

export default CommandPalette;
