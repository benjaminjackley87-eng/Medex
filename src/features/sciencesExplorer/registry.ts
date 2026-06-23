import React from 'react';
import { PVLoopSimulator } from './simulators/PVLoopSimulator';
import { OHDCPlusSimulator } from './simulators/OHDCPlusSimulator';

export interface SimulatorDetails {
  title: string;
  type: string;
  description: string;
  Component: React.ComponentType;
  checklist: string[];
}

export const DIAGRAM_SIMULATORS: Record<string, SimulatorDetails> = {
  concept_cardiac_cycle_wiggers_01: {
    title: 'Pressure-Volume Loop Simulator',
    type: 'Interactive Graph Block',
    description:
      'Left ventricular PV loops bounded by the ESPVR and EDPVR curves. Click states above to simulate pathophysiology shifts.',
    Component: PVLoopSimulator,
    checklist: [
      'ESPVR slope represents contractility (Ees)',
      'EDPVR slope represents compliance (diastolic boundary)',
      'Width of loop represents stroke volume (EDV - ESV)'
    ]
  },
  concept_gas_transport_kinetics_01: {
    title: 'Oxyhaemoglobin Dissociation Curve (OHDC) Simulator',
    type: 'Interactive Graph Block',
    description:
      'Sigmoidal oxygen-hemoglobin binding curve. Toggle shifts to simulate physiological and molecular factors (Bohr/Haldane effects).',
    Component: OHDCPlusSimulator,
    checklist: [
      'Normal P50 is 26.8 mmHg',
      'Right shifts are caused by increased CO2, acidity, 2,3-BPG, or temperature',
      'Left shifts increase affinity, preventing peripheral tissue oxygen unloading'
    ]
  }
};
