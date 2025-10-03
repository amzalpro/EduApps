import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({ isAuthenticated: false, user: null });
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should login successfully with valid credentials', () => {
    const { login } = useAuthStore.getState();
    const result = login('testuser', 'password123');
    
    expect(result).toBe(true);
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toBe('testuser');
  });

  it('should fail login with empty username', () => {
    const { login } = useAuthStore.getState();
    const result = login('', 'password123');
    
    expect(result).toBe(false);
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should fail login with empty password', () => {
    const { login } = useAuthStore.getState();
    const result = login('testuser', '');
    
    expect(result).toBe(false);
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should logout successfully', () => {
    const { login, logout } = useAuthStore.getState();
    
    // First login
    login('testuser', 'password123');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    // Then logout
    logout();
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(null);
  });

  it('should store correct username after login', () => {
    const { login } = useAuthStore.getState();
    
    login('alice', 'secret');
    expect(useAuthStore.getState().user).toBe('alice');
    
    useAuthStore.getState().logout();
    
    login('bob', 'password');
    expect(useAuthStore.getState().user).toBe('bob');
  });
});
