import React from 'react';
import {
  Heart,
  Wind,
  Droplets,
  Brain,
  GitBranch,
  Flame,
  Syringe,
  Dumbbell,
  Baby
} from 'lucide-react';

export type Layer = 1 | 2 | 3 | 4;

export interface OrganSystemConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  layers: {
    1: string[]; // Layer 1 moduleIds
    2: string[]; // Layer 2 moduleIds
    3: string[]; // Layer 3 moduleIds
  };
}

export const ORGAN_SYSTEMS: OrganSystemConfig[] = [
  {
    id: 'cvs',
    name: 'Cardiovascular',
    icon: React.createElement(Heart, { className: 'w-5 h-5' }),
    color: 'from-rose-500 to-red-600',
    bgGradient: 'from-rose-500/10 to-transparent',
    layers: {
      1: ['anat_cvs_01'],
      2: ['cell_cardiac_01'],
      3: ['phys_cvs_01']
    }
  },
  {
    id: 'resp',
    name: 'Respiratory',
    icon: React.createElement(Wind, { className: 'w-5 h-5' }),
    color: 'from-sky-500 to-blue-600',
    bgGradient: 'from-sky-500/10 to-transparent',
    layers: {
      1: ['anat_resp_01'],
      2: ['cell_pulmonary_01'],
      3: ['phys_resp_01']
    }
  },
  {
    id: 'renal',
    name: 'Renal & Acid-Base',
    icon: React.createElement(Droplets, { className: 'w-5 h-5' }),
    color: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-500/10 to-transparent',
    layers: {
      1: ['anat_renal_01'],
      2: ['cell_renal_01'],
      3: ['phys_renal_01']
    }
  },
  {
    id: 'neuro',
    name: 'Neuroscience & Pain',
    icon: React.createElement(Brain, { className: 'w-5 h-5' }),
    color: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/10 to-transparent',
    layers: {
      1: ['anat_neuraxis_01', 'anat_pain_01', 'anat_cns_01', 'anat_pns_01'],
      2: ['cell_neuro_01', 'cell_synapse_01'],
      3: ['phys_neuro_01']
    }
  },
  {
    id: 'hepatic',
    name: 'Hepatic & GI',
    icon: React.createElement(GitBranch, { className: 'w-5 h-5' }),
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-transparent',
    layers: {
      1: ['anat_hepatic_01', 'anat_git_01'],
      2: ['cell_hepatic_01'],
      3: ['phys_hepatic_01']
    }
  },
  {
    id: 'endocrine',
    name: 'Endocrine & Metabolism',
    icon: React.createElement(Flame, { className: 'w-5 h-5' }),
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-transparent',
    layers: {
      1: ['anat_endocrine_01'],
      2: ['cell_endocrine_01'],
      3: ['phys_endocrine_01']
    }
  },
  {
    id: 'haem',
    name: 'Haematology & Immunology',
    icon: React.createElement(Syringe, { className: 'w-5 h-5' }),
    color: 'from-red-600 to-orange-700',
    bgGradient: 'from-red-600/10 to-transparent',
    layers: {
      1: ['anat_haem_01'],
      2: ['cell_haem_01'],
      3: ['phys_haem_01']
    }
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal & NMJ',
    icon: React.createElement(Dumbbell, { className: 'w-5 h-5' }),
    color: 'from-teal-500 to-emerald-600',
    bgGradient: 'from-teal-500/10 to-transparent',
    layers: {
      1: ['anat_musculoskeletal_01'],
      2: ['cell_synapse_01'],
      3: ['phys_musculoskeletal_01']
    }
  },
  {
    id: 'paed',
    name: 'Paediatrics & Maternal',
    icon: React.createElement(Baby, { className: 'w-5 h-5' }),
    color: 'from-fuchsia-500 to-pink-600',
    bgGradient: 'from-fuchsia-500/10 to-transparent',
    layers: {
      1: ['anat_paed_01'],
      2: ['cell_paed_01'],
      3: ['phys_paed_01']
    }
  }
];
