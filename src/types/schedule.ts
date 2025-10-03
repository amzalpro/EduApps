/**
 * Types pour l'emploi du temps et le tableau de bord
 */

export interface TimeSlot {
  id: string;
  dayOfWeek: number; // 0-6 (lundi-dimanche)
  startTime: string; // "08:00"
  endTime: string; // "09:00"
  subject: string;
  classRoom: string;
  location?: string;
  week?: 'A' | 'B' | 'all';
}

export interface Schedule {
  id: string;
  name: string;
  timeSlots: TimeSlot[];
  schoolYear: string;
  startDate: string;
  endDate: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'pense-bête' | 'agenda' | 'réunion' | 'rendez-vous';
  date?: string;
  time?: string;
  completed: boolean;
  priority?: 'haute' | 'normale' | 'basse';
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  type: 'retenue' | 'appel' | 'rendez-vous-parent' | 'cours' | 'devoir' | 'autre';
  date: string;
  time?: string;
  studentId?: string;
  completed: boolean;
  notified: boolean;
  createdAt: string;
}

export interface ClassLayout {
  id: string;
  name: string;
  rows: number;
  columns: number;
  seats: ClassSeat[];
}

export interface ClassSeat {
  row: number;
  column: number;
  studentId?: string;
  isEmpty?: boolean;
  isTeacherDesk?: boolean;
}
