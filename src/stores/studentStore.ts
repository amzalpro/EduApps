import { create } from 'zustand';
import { Student } from '../types';

interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  
  // Actions
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  selectStudent: (student: Student | null) => void;
  getStudentById: (id: string) => Student | undefined;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  selectedStudent: null,
  
  setStudents: (students) => set({ students }),
  
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  
  updateStudent: (id, updates) =>
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    })),
  
  selectStudent: (student) => set({ selectedStudent: student }),
  
  getStudentById: (id) => {
    const state = get();
    return state.students.find((s) => s.id === id);
  },
}));
