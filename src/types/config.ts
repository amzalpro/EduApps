/**
 * Types pour la configuration et les paramètres
 */

export interface UserProfile {
  id: string;
  username: string;
  role: 'enseignant' | 'admin';
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  subjects?: string[];
}

export interface SchoolInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  schoolYear: string;
}

export interface AppSettings {
  language: 'fr' | 'en' | 'es';
  theme: 'light' | 'dark' | 'auto';
  
  // Mode classe
  classModeEnabled: boolean;
  classModeHidesPersonalInfo: boolean;
  
  // Outils disponibles
  availableTools: {
    dashboard: boolean;
    classRoom: boolean;
    evaluations: boolean;
    schoolLife: boolean;
    protocols: boolean;
    widgets: boolean;
  };
  
  // Paramètres emploi du temps
  scheduleSettings: {
    useAlternatingWeeks: boolean; // Semaines A/B
    firstWeekType?: 'A' | 'B';
    timeSlots: {
      startTime: string;
      endTime: string;
    }[];
  };
  
  // Périodes
  periods: Period[];
  
  // Vacances et jours fériés
  holidays: Holiday[];
}

export interface Period {
  id: string;
  name: string;
  type: 'trimestre' | 'semestre';
  startDate: string;
  endDate: string;
  schoolYear: string;
}

export interface Holiday {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'vacances' | 'jour-férié' | 'pont';
}

export interface DatabaseInfo {
  path: string;
  name: string;
  lastOpened: string;
  createdAt: string;
}
