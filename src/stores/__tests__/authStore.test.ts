import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { logout } = useAuthStore.getState();
    logout();
  });

  it('should have initial state with no user', () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should login a user with provided credentials', () => {
    const { login } = useAuthStore.getState();
    
    login('John Doe', 'john@example.com');
    
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'teacher',
    });
  });

  it('should login a user with custom role', () => {
    const { login } = useAuthStore.getState();
    
    login('Admin User', 'admin@example.com', 'admin');
    
    const { user } = useAuthStore.getState();
    expect(user?.role).toBe('admin');
  });

  it('should logout a user', () => {
    const { login, logout } = useAuthStore.getState();
    
    // First login
    login('Jane Smith', 'jane@example.com');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    // Then logout
    logout();
    
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should handle multiple login/logout cycles', () => {
    const { login, logout } = useAuthStore.getState();
    
    // First cycle
    login('User One', 'user1@example.com');
    expect(useAuthStore.getState().user?.name).toBe('User One');
    
    logout();
    expect(useAuthStore.getState().user).toBeNull();
    
    // Second cycle
    login('User Two', 'user2@example.com');
    expect(useAuthStore.getState().user?.name).toBe('User Two');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
