import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '../authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  });

  it('authentifie un enseignant et initialise son profil', () => {
    const { login } = useAuthStore.getState();

    login('prof', 'secret', 'enseignant');

    const { user, isAuthenticated } = useAuthStore.getState();

    expect(isAuthenticated).toBe(true);
    expect(user).not.toBeNull();
    expect(user).toMatchObject({
      username: 'prof',
      role: 'enseignant',
      firstName: 'Enseignant',
      lastName: 'Test',
      email: 'prof@example.com',
    });
  });

  it('authentifie un admin avec des métadonnées spécifiques', () => {
    const { login } = useAuthStore.getState();

    login('admin', 'secret', 'admin');

    const { user } = useAuthStore.getState();

    expect(user).not.toBeNull();
    expect(user?.firstName).toBe('Administrateur');
    expect(user?.role).toBe('admin');
  });

  it('réinitialise l\'état lors de la déconnexion', () => {
    const { login, logout } = useAuthStore.getState();

    login('prof', 'secret', 'enseignant');
    logout();

    const { user, isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
  });
});
