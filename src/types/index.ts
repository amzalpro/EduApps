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

export interface UserProfile {
  id: string;
  username: string;
  role: 'enseignant' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
}