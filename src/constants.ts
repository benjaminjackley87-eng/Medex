import { AppTheme } from './types';

// Consolidate and re-export examinations
export { ALL_EXAMINATIONS as EXAMINATIONS } from './data';

/**
 * Gemini API and AI service configurations
 */
export const GEMINI_CONFIG = {
  MODEL_FLASH: 'gemini-3-flash-preview',
  MODEL_PRO: 'gemini-3.1-pro-preview',
  MAX_CONCURRENCY: 1
};

/**
 * Unified Local Storage namespace keys
 */
export const STORAGE_KEYS = {
  DOWNLOAD_QUEUE: 'medex_download_queue',
  CHECKED_STEPS: (examId: string) => `checkedSteps_${examId}`,
  COLUMN_WIDTHS: (layoutKey: string) => `medex_colWidths_${layoutKey}`,
  APP_THEME: 'medex_theme_preference'
};

/**
 * Default Theme configuration
 */
export const DEFAULT_THEME: AppTheme = {
  primaryColor: '#3b82f6', // blue-500
  secondaryColor: '#6366f1', // indigo-500
  accentColor: '#f43f5e', // rose-500
  borderRadius: '2xl',
  fontSans: 'Inter',
  glassEffect: 'medium'
};

/**
 * Application routing paths
 */
export const APP_ROUTES = {
  DASHBOARD: '/dashboard',
  LIBRARY: '/library',
  EXAM: (id: string) => `/exam/${id}`,
  DIAGNOSTIC_REASONING: '/diagnostic-reasoning',
  INVESTIGATIONS_HUB: '/investigations-hub',
  THERAPEUTICS_TOX: '/therapeutics-tox',
  ACUTE_INTERVENTIONS: '/acute-interventions',
  FOUNDATIONS: '/foundations',
  STUDY_HUB: '/study-hub',
  DOWNLOADS: '/downloads',
  SETTINGS: '/settings',
  DEV: '/dev',
  WORKSPACE: '/workspace'
};
