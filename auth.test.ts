/**
 * Tests for auth.ts login function error handling
 */

import {
  login,
  loginWithErrorHandling,
  AuthError,
  ValidationError,
  NetworkError,
  UnauthorizedError,
  LoginCredentials,
} from './auth';

// Mock fetch for testing
global.fetch = jest.fn();

describe('login function error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input validation errors', () => {
    it('should throw ValidationError when credentials are null', async () => {
      await expect(login(null as any)).rejects.toThrow(ValidationError);
      await expect(login(null as any)).rejects.toThrow('Credentials are required');
    });

    it('should throw ValidationError when email is missing', async () => {
      await expect(login({ email: '', password: 'password123' })).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError when password is missing', async () => {
      await expect(login({ email: 'test@example.com', password: '' })).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError for invalid email format', async () => {
      await expect(
        login({ email: 'invalid-email', password: 'password123' })
      ).rejects.toThrow('Invalid email format');
    });

    it('should throw ValidationError for short password', async () => {
      await expect(login({ email: 'test@example.com', password: 'short' })).rejects.toThrow(
        'Password must be at least 8 characters long'
      );
    });
  });

  describe('Network errors', () => {
    it('should throw NetworkError on network failure', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow(NetworkError);
    });

    it('should throw NetworkError on timeout', async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 15000))
      );

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow('Request timeout');
    });
  });

  describe('HTTP status errors', () => {
    it('should throw UnauthorizedError on 401 status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      await expect(
        login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toThrow(UnauthorizedError);
      await expect(
        login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw UnauthorizedError on 403 status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ message: 'Account locked' }),
      });

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow('Account is locked or disabled');
    });

    it('should throw AuthError with RATE_LIMIT code on 429 status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({ message: 'Too many attempts' }),
      });

      try {
        await login({ email: 'test@example.com', password: 'password123' });
      } catch (error) {
        expect(error).toBeInstanceOf(AuthError);
        expect((error as AuthError).code).toBe('RATE_LIMIT');
      }
    });

    it('should throw NetworkError on 500 status', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Server error' }),
      });

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow(NetworkError);
    });
  });

  describe('Response validation errors', () => {
    it('should throw AuthError when response is not JSON', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow('Invalid response format from server');
    });

    it('should throw AuthError when token is missing', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          user: { id: '123', email: 'test@example.com' },
        }),
      });

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow('Invalid response: missing authentication token');
    });

    it('should throw AuthError when user data is missing', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          token: 'abc123',
        }),
      });

      await expect(
        login({ email: 'test@example.com', password: 'password123' })
      ).rejects.toThrow('Invalid response: missing user data');
    });
  });

  describe('Successful login', () => {
    it('should return success response with token and user data', async () => {
      const mockResponse = {
        token: 'valid-token-123',
        user: {
          id: '123',
          email: 'test@example.com',
          name: 'Test User',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await login({ email: 'test@example.com', password: 'password123' });

      expect(result.success).toBe(true);
      expect(result.token).toBe('valid-token-123');
      expect(result.user).toEqual({
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should handle user without name field', async () => {
      const mockResponse = {
        token: 'valid-token-123',
        user: {
          id: '123',
          email: 'test@example.com',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await login({ email: 'test@example.com', password: 'password123' });

      expect(result.success).toBe(true);
      expect(result.user?.name).toBe('');
    });
  });
});
