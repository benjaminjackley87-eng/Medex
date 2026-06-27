import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ExamNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-8">
      <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Exam Not Found</p>
      <button
        onClick={() => navigate('/library')}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider"
      >
        Back to Library
      </button>
    </div>
  );
};
