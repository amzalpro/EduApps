import { create } from 'zustand';
import { UserProfile } from '../types';

type AuthRole = 'enseignant' | 'admin';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (username: string, password: string, role: AuthRole) => boolean;
  logout: () => void;
}

const USERS: Record<string, { password: string; role: AuthRole; firstName: string; lastName: string; email: string }> = {
  test: {
    password: 'test',
    role: 'enseignant',
    firstName: 'Enseignant',
    lastName: 'Demo',
    email: 'enseignant@example.com',
  },
  admin: {
    password: 'admin',
    role: 'admin',
    firstName: 'Administrateur',
    lastName: 'Demo',
    email: 'admin@example.com',
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  login: (username, password, role) => {
    const credentials = USERS[username];

    if (!credentials || credentials.password !== password || credentials.role !== role) {
      set({ error: 'Identifiants invalides', user: null, isAuthenticated: false });
      return false;
    }

    const user: UserProfile = {
      id: `${username}-${role}`,
      username,
      role,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
    };

    set({ user, isAuthenticated: true, error: null });
    return true;
  },
  logout: () => set({ user: null, isAuthenticated: false, error: null }),
}));
