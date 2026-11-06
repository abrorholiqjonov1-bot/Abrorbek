/**
 * Authentication module with comprehensive error handling
 */

// Custom error types for better error handling
export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AuthError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AuthError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string) {
    super(message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

// Login credentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Login response interface
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Login function with comprehensive error handling
 * @param credentials - User login credentials
 * @returns Promise<LoginResponse> - Login response with token or error
 * @throws {ValidationError} - When input validation fails
 * @throws {NetworkError} - When network request fails
 * @throws {UnauthorizedError} - When credentials are invalid
 * @throws {AuthError} - For other authentication errors
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    // Input validation
    if (!credentials) {
      throw new ValidationError('Credentials are required');
    }

    if (!credentials.email || typeof credentials.email !== 'string') {
      throw new ValidationError('Email is required and must be a string');
    }

    if (!credentials.password || typeof credentials.password !== 'string') {
      throw new ValidationError('Password is required and must be a string');
    }

    // Trim whitespace
    const email = credentials.email.trim();
    const password = credentials.password.trim();

    // Validate email format
    if (!isValidEmail(email)) {
      throw new ValidationError('Invalid email format');
    }

    // Validate password
    if (!isValidPassword(password)) {
      throw new ValidationError('Password must be at least 8 characters long');
    }

    // Make API request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let response: Response;
    try {
      response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NetworkError('Request timeout - please check your connection');
        }
        throw new NetworkError(`Network request failed: ${error.message}`);
      }
      throw new NetworkError('Network request failed');
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = 'Login failed';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      switch (response.status) {
        case 401:
          throw new UnauthorizedError('Invalid email or password');
        case 403:
          throw new UnauthorizedError('Account is locked or disabled');
        case 429:
          throw new AuthError('Too many login attempts. Please try again later', 'RATE_LIMIT');
        case 500:
        case 502:
        case 503:
        case 504:
          throw new NetworkError('Server error. Please try again later');
        default:
          throw new AuthError(errorMessage, 'LOGIN_FAILED');
      }
    }

    // Parse response
    let data: any;
    try {
      data = await response.json();
    } catch (error) {
      throw new AuthError('Invalid response format from server', 'PARSE_ERROR');
    }

    // Validate response data
    if (!data.token) {
      throw new AuthError('Invalid response: missing authentication token', 'INVALID_RESPONSE');
    }

    if (!data.user || !data.user.id || !data.user.email) {
      throw new AuthError('Invalid response: missing user data', 'INVALID_RESPONSE');
    }

    // Return success response
    return {
      success: true,
      token: data.token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name || '',
      },
    };

  } catch (error) {
    // Re-throw known errors
    if (error instanceof AuthError) {
      throw error;
    }

    // Handle unexpected errors
    if (error instanceof Error) {
      throw new AuthError(`Unexpected error: ${error.message}`, 'UNKNOWN_ERROR');
    }

    // Fallback for non-Error objects
    throw new AuthError('An unexpected error occurred during login', 'UNKNOWN_ERROR');
  }
}

/**
 * Example usage with error handling
 */
export async function loginWithErrorHandling(email: string, password: string): Promise<void> {
  try {
    const response = await login({ email, password });
    
    if (response.success && response.token) {
      console.log('Login successful!');
      console.log('User:', response.user);
      // Store token securely (e.g., in httpOnly cookie or secure storage)
      localStorage.setItem('authToken', response.token);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
      // Show user-friendly validation message
    } else if (error instanceof UnauthorizedError) {
      console.error('Authentication failed:', error.message);
      // Show "invalid credentials" message
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      // Show "please check connection" message
    } else if (error instanceof AuthError) {
      console.error('Authentication error:', error.message, `(${error.code})`);
      // Show generic error message
    } else {
      console.error('Unexpected error:', error);
      // Show generic error message
    }
  }
}
