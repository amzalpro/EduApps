/**
 * Types pour la vie scolaire
 */

export interface Absence {
  id: string;
  studentId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: 'maladie' | 'rendez-vous' | 'non-justifié' | 'autre';
  justified: boolean;
  justificationDocument?: string;
  comment?: string;
  notifiedParents: boolean;
  createdAt: string;
}

export interface Retard {
  id: string;
  studentId: string;
  date: string;
  time: string;
  duration: number; // en minutes
  justified: boolean;
  reason?: string;
  createdAt: string;
}

export interface Behavior {
  id: string;
  studentId: string;
  date: string;
  type: 'bavardage' | 'oubli' | 'manque-travail' | 'comportement' | 'participation-positive';
  severity?: 'léger' | 'moyen' | 'grave';
  description: string;
  action?: string;
  notifiedParents: boolean;
  createdAt: string;
}

export interface Punishment {
  id: string;
  studentId: string;
  date: string;
  type: 'retenue' | 'exclusion' | 'avertissement' | 'autre';
  reason: string;
  duration?: number; // en heures pour retenue
  scheduledDate?: string;
  completed: boolean;
  notifiedParents: boolean;
  createdAt: string;
}

export interface PersonalNote {
  id: string;
  studentId?: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
