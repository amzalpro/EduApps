import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: 'enseignant' | 'admin') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (username, _password, role) => {
    // Simulation de l'authentification
    const user: UserProfile = {
      id: '1',
      username,
      role,
      firstName: role === 'admin' ? 'Administrateur' : 'Enseignant',
      lastName: 'Test',
      email: `${username}@example.com`,
    };
    
    set({ user, isAuthenticated: true });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
