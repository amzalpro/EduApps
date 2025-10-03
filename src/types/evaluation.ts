/**
 * Types pour la gestion des compétences et évaluations
 */

export interface Competence {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  level?: string;
}

export interface Evaluation {
  id: string;
  studentId: string;
  date: string;
  type: 'competence' | 'note' | 'bilan';
  
  // Pour les évaluations par compétences
  competenceId?: string;
  level?: 'A' | 'B' | 'C' | 'D' | 'non-évalué';
  
  // Pour les notes
  grade?: number;
  maxGrade?: number;
  coefficient?: number;
  
  // Informations communes
  subject?: string;
  title?: string;
  comment?: string;
  period?: string;
}

export interface Bilan {
  id: string;
  studentId: string;
  period: string;
  type: 'trimestre' | 'semestre' | 'annuel';
  evaluations: Evaluation[];
  generalComment?: string;
  teacherComments?: TeacherComment[];
  createdAt: string;
}

export interface TeacherComment {
  subject: string;
  comment: string;
  teacherName: string;
}
