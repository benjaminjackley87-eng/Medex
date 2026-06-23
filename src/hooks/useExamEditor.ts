import { useState, useEffect } from 'react';
import { Examination, ExamStep, ClinicalFinding } from '../types';
import { storage } from '../services/storageService';

export function useExamEditor(initialExam: Examination, onUpdate?: (updated: Examination) => void) {
  const [exam, setExam] = useState(initialExam);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExam(initialExam);
    setIsDirty(false);
  }, [initialExam]);

  const updateGeneralField = <K extends keyof Examination>(field: K, value: Examination[K]) => {
    setExam((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const updateStepField = <K extends keyof ExamStep>(stepId: string, field: K, value: ExamStep[K]) => {
    setExam((prev) => {
      const newSteps = prev.steps.map((s) => (s.id === stepId ? { ...s, [field]: value } : s));
      return { ...prev, steps: newSteps };
    });
    setIsDirty(true);
  };

  const addStep = (category: string) => {
    const newStep: ExamStep = {
      id: `step-${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Clinical Step',
      description: 'Describe the maneuver...',
      category: category,
      positiveFindings: []
    };
    setExam((prev) => ({ ...prev, steps: [...prev.steps, newStep] }));
    setIsDirty(true);
  };

  const removeStep = (stepId: string) => {
    setExam((prev) => ({ ...prev, steps: prev.steps.filter((s) => s.id !== stepId) }));
    setIsDirty(true);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    setExam((prev) => {
      const newSteps = [...prev.steps];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newSteps.length) return prev;
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      return { ...prev, steps: newSteps };
    });
    setIsDirty(true);
  };

  const addFinding = (stepId: string, description: string) => {
    setExam((prev) => {
      const newSteps = prev.steps.map((s) => {
        if (s.id === stepId) {
          const findings = s.positiveFindings || [];
          return { ...s, positiveFindings: [...findings, { description }] };
        }
        return s;
      });
      return { ...prev, steps: newSteps };
    });
    setIsDirty(true);
  };

  const removeFinding = (stepId: string, findingIndex: number) => {
    setExam((prev) => {
      const newSteps = prev.steps.map((s) => {
        if (s.id === stepId && s.positiveFindings) {
          return {
            ...s,
            positiveFindings: s.positiveFindings.filter((_, i) => i !== findingIndex)
          };
        }
        return s;
      });
      return { ...prev, steps: newSteps };
    });
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const updatedExam = { ...exam, isDownloaded: true, lastUpdated: Date.now() };
      await storage.saveExamination(updatedExam);
      setIsDirty(false);
      onUpdate?.(updatedExam);
      return true;
    } catch (e) {
      console.error('Save failed', e);
      return false;
    }
  };

  return {
    exam,
    setExam,
    isDirty,
    setIsDirty,
    updateGeneralField,
    updateStepField,
    addStep,
    removeStep,
    moveStep,
    addFinding,
    removeFinding,
    addDifferentialDiagnosis: (condition: string, explanation: string) => {
      setExam((prev) => ({
        ...prev,
        differentialDiagnoses: [...(prev.differentialDiagnoses || []), { condition, explanation }]
      }));
      setIsDirty(true);
    },
    removeDifferentialDiagnosis: (index: number) => {
      setExam((prev) => ({
        ...prev,
        differentialDiagnoses: (prev.differentialDiagnoses || []).filter((_, i) => i !== index)
      }));
      setIsDirty(true);
    },
    addVisualAid: (type: 'diagram' | 'video', description: string, source?: string) => {
      setExam((prev) => ({
        ...prev,
        visualAids: [...(prev.visualAids || []), { type, description, source }]
      }));
      setIsDirty(true);
    },
    removeVisualAid: (index: number) => {
      setExam((prev) => ({
        ...prev,
        visualAids: (prev.visualAids || []).filter((_, i) => i !== index)
      }));
      setIsDirty(true);
    },
    addRedFlag: (flag: string) => {
      setExam((prev) => ({
        ...prev,
        redFlags: [...(prev.redFlags || []), flag]
      }));
      setIsDirty(true);
    },
    removeRedFlag: (index: number) => {
      setExam((prev) => ({
        ...prev,
        redFlags: (prev.redFlags || []).filter((_, i) => i !== index)
      }));
      setIsDirty(true);
    },
    handleSave
  };
}
