import { Examination } from '../types';
import { cardiovascularExaminations } from './cardiovascular';
import { respiratoryExaminations } from './respiratory';
import { gastrointestinalExaminations } from './gastrointestinal';
import { genitourinaryExaminations } from './genitourinary';
import { neurologicalExaminations } from './neurological';
import { rheumatologicalExaminations } from './rheumatological';
import { endocrineExaminations } from './endocrine';
import { paediatricExaminations } from './paediatric';
import { womensHealthExaminations } from './womens_health';
import { mentalHealthExaminations } from './mental_health';
import { acuteCareExaminations } from './acute_care';
import { specialtyExaminations } from './specialty';
import { dermatologyExaminations } from './dermatology';
import { generalExaminations } from './general';

export const ALL_EXAMINATIONS: Examination[] = [
  ...generalExaminations,
  ...cardiovascularExaminations,
  ...respiratoryExaminations,
  ...gastrointestinalExaminations,
  ...genitourinaryExaminations,
  ...neurologicalExaminations,
  ...rheumatologicalExaminations,
  ...endocrineExaminations,
  ...paediatricExaminations,
  ...womensHealthExaminations,
  ...mentalHealthExaminations,
  ...acuteCareExaminations,
  ...specialtyExaminations,
  ...dermatologyExaminations,
];

export * from './cardiovascular';
export * from './respiratory';
export * from './gastrointestinal';
export * from './genitourinary';
export * from './neurological';
export * from './rheumatological';
export * from './endocrine';
export * from './paediatric';
export * from './womens_health';
export * from './mental_health';
export * from './acute_care';
export * from './specialty';
export * from './dermatology';
export * from './general';
