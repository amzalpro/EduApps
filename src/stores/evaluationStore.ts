import { create } from 'zustand';
import { Evaluation, Competence } from '../types';

interface EvaluationState {
  evaluations: Evaluation[];
  competences: Competence[];
  
  // Actions
  setEvaluations: (evaluations: Evaluation[]) => void;
  addEvaluation: (evaluation: Evaluation) => void;
  updateEvaluation: (id: string, updates: Partial<Evaluation>) => void;
  deleteEvaluation: (id: string) => void;
  getEvaluationsByStudent: (studentId: string) => Evaluation[];
  
  setCompetences: (competences: Competence[]) => void;
  addCompetence: (competence: Competence) => void;
}

export const useEvaluationStore = create<EvaluationState>((set, get) => ({
  evaluations: [],
  competences: [],
  
  setEvaluations: (evaluations) => set({ evaluations }),
  
  addEvaluation: (evaluation) =>
    set((state) => ({
      evaluations: [...state.evaluations, evaluation],
    })),
  
  updateEvaluation: (id, updates) =>
    set((state) => ({
      evaluations: state.evaluations.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    })),
  
  deleteEvaluation: (id) =>
    set((state) => ({
      evaluations: state.evaluations.filter((e) => e.id !== id),
    })),
  
  getEvaluationsByStudent: (studentId) => {
    const state = get();
    return state.evaluations.filter((e) => e.studentId === studentId);
  },
  
  setCompetences: (competences) => set({ competences }),
  
  addCompetence: (competence) =>
    set((state) => ({
      competences: [...state.competences, competence],
    })),
}));
