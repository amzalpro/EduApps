import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings, SchoolInfo } from '../types';

interface AppState {
  settings: AppSettings;
  schoolInfo: SchoolInfo;
  currentLanguage: string;
  classModeEnabled: boolean;
  
  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;
  setLanguage: (lang: string) => void;
  toggleClassMode: () => void;
}

const defaultSettings: AppSettings = {
  language: 'fr',
  theme: 'light',
  classModeEnabled: false,
  classModeHidesPersonalInfo: true,
  availableTools: {
    dashboard: true,
    classRoom: true,
    evaluations: true,
    schoolLife: true,
    protocols: true,
    widgets: true,
  },
  scheduleSettings: {
    useAlternatingWeeks: false,
    timeSlots: [
      { startTime: '08:00', endTime: '09:00' },
      { startTime: '09:00', endTime: '10:00' },
      { startTime: '10:15', endTime: '11:15' },
      { startTime: '11:15', endTime: '12:15' },
      { startTime: '14:00', endTime: '15:00' },
      { startTime: '15:00', endTime: '16:00' },
      { startTime: '16:15', endTime: '17:15' },
    ],
  },
  periods: [],
  holidays: [],
};

const defaultSchoolInfo: SchoolInfo = {
  name: 'Mon Établissement',
  schoolYear: '2024-2025',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      schoolInfo: defaultSchoolInfo,
      currentLanguage: 'FR',
      classModeEnabled: false,
      
      updateSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
      
      updateSchoolInfo: (info) =>
        set((state) => ({
          schoolInfo: { ...state.schoolInfo, ...info }
        })),
      
      setLanguage: (lang) => set({ currentLanguage: lang }),
      
      toggleClassMode: () =>
        set((state) => ({ classModeEnabled: !state.classModeEnabled })),
    }),
    {
      name: 'app-storage',
    }
  )
);
