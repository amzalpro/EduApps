import { LayoutTemplate, LevelConfig } from '../types';

export const mockTemplates: Record<string, LayoutTemplate> = {
  'Îlots': {
    name: 'Îlots',
    data: [
      { type: 'desk-block4', x: 10, y: 10 },
      { type: 'desk-block4', x: 10, y: 50 },
      { type: 'desk-block4', x: 65, y: 10 },
      { type: 'desk-block4', x: 65, y: 50 },
      { type: 'teacher-desk-item', x: 37.5, y: 85, content: '👨‍🏫' }
    ]
  },
  'Bus': {
    name: 'Bus',
    data: [
      { type: 'desk-pair', x: 10, y: 10 },
      { type: 'desk-pair', x: 10, y: 30 },
      { type: 'desk-pair', x: 10, y: 50 },
      { type: 'desk-pair', x: 10, y: 70 },
      { type: 'desk-pair', x: 65, y: 10 },
      { type: 'desk-pair', x: 65, y: 30 },
      { type: 'desk-pair', x: 65, y: 50 },
      { type: 'desk-pair', x: 65, y: 70 },
      { type: 'teacher-desk-item', x: 37.5, y: 85, content: '👨‍🏫' }
    ]
  }
};

export const mockLevels: LevelConfig[] = [
  {
    name: '6ème',
    classes: [
      {
        name: '6A',
        level: '6ème',
        color: '#ef4444',
        evalType: 'notes_competences',
        studentCount: 28,
        studentList: Array.from({ length: 28 }, (_, i) => `Élève ${i + 1}`),
        selectedPlans: ['Îlots'],
        cahierTextePages: 10,
        notesPages: 5,
        extraNotesPages: 30,
        extraCompetencesPages: 20
      },
      {
        name: '6B',
        level: '6ème',
        color: '#f97316',
        evalType: 'competences',
        studentCount: 26,
        studentList: Array.from({ length: 26 }, (_, i) => `Élève ${i + 1}`),
        selectedPlans: ['Bus'],
        cahierTextePages: 8,
        notesPages: 4,
        extraNotesPages: 0,
        extraCompetencesPages: 15
      }
    ]
  },
  {
    name: '3ème',
    classes: [
      {
        name: '3B',
        level: '3ème',
        color: '#3b82f6',
        evalType: 'notes',
        studentCount: 25,
        studentList: Array.from({ length: 25 }, (_, i) => `Apprenant ${i + 1}`),
        selectedPlans: ['Bus'],
        cahierTextePages: 12,
        notesPages: 10,
        extraNotesPages: 50,
        extraCompetencesPages: 0
      }
    ]
  }
];