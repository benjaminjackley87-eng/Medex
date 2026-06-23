import React from 'react';
import { BookOpen } from 'lucide-react';

const TutorialView: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Tutorial Info</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
            How to use MedEx Nexus
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bento-card p-8">
          <h2 className="text-xl font-black text-slate-300 mb-4">Welcome to MedEx Nexus</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            MedEx Nexus is your comprehensive medical examination and clinical reasoning platform.
            Navigate through the sidebar to access different modules:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li>
              <strong>Dashboard:</strong> Your learning progress and recent activity.
            </li>
            <li>
              <strong>Examinations:</strong> The core library of clinical examination protocols.
            </li>
            <li>
              <strong>Clinical Tools:</strong> Access the Clinical Finder, Correlation tool, and
              Investigation Hub.
            </li>
            <li>
              <strong>Examinations:</strong> Comprehensive system-based clinical assessment
              protocols.
            </li>
            <li>
              <strong>Saved Files:</strong> Access your downloaded exams for offline use.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TutorialView;
