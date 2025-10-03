import { create } from 'zustand';

interface AuthState {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, role?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (name: string, email: string, role = 'teacher') =>
    set({
      user: { name, email, role },
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
