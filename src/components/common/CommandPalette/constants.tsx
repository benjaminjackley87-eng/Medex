import React from 'react';
import {
  BookOpen,
  GraduationCap,
  FolderArchive,
  Terminal,
  Zap,
  Microscope,
  Activity,
  Pill,
  Layers
} from 'lucide-react';
import { AppView } from '../../../types';

export const COMMAND_VIEWS = [
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
