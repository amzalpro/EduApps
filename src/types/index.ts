export interface ClassConfig {
  name: string;
  level: string;
  color: string;
  evalType: 'competences' | 'notes' | 'notes_competences';
  studentCount: number;
  studentList: string[];
  selectedPlans: string[];
  cahierTextePages: number;
  notesPages: number;
  extraNotesPages: number;
  extraCompetencesPages: number;
}

export interface LevelConfig {
  name: string;
  classes: ClassConfig[];
}

export interface LayoutTemplate {
  name: string;
  data: LayoutElement[];
}

export interface LayoutElement {
  type: 'desk' | 'desk-pair' | 'desk-block4' | 'teacher-desk-item';
  x: number;
  y: number;
  content?: string;
}

export interface FormData {
  teacherName: string;
  schoolName: string;
  academicYear: string;
  subject: string;
  subjectCustom: string;
  periods: string[];
  coverImageUrl: string;
  layoutTemplates: Record<string, LayoutTemplate>;
  levels: LevelConfig[];
}

export interface SommaireItem {
  page: number;
  label: string;
}

/**
 * Export de tous les types pour l'application de gestion scolaire
 */
export * from './student';
export * from './evaluation';
export * from './schoolLife';
export * from './schedule';
export * from './config';

/**
 * Types pour les modèles de lettres
 */
export interface LetterTemplate {
  id: string;
  name: string;
  type: 'parent' | 'administration' | 'élève' | 'autre';
  subject: string;
  content: string;
  variables: string[]; // Variables disponibles comme {{nom}}, {{prénom}}, etc.
  createdAt: string;
  updatedAt: string;
}

/**
 * Types pour les widgets
 */
export interface Widget {
  id: string;
  type: 'jeu' | 'annuaire' | 'dictionnaire' | 'sites-favoris' | 'qr-code';
  name: string;
  config?: Record<string, any>;
  enabled: boolean;
}

export interface FavoriteSite {
  id: string;
  name: string;
  url: string;
  category?: string;
  icon?: string;
}