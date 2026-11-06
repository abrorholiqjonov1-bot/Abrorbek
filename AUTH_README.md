# Authentication Module - Error Handling Documentation

## Overview

The `auth.ts` module provides a robust login function with comprehensive error handling. It validates inputs, handles network issues, and provides detailed error information for better debugging and user experience.

## Features

### 1. **Custom Error Types**

The module defines specific error classes for different scenarios:

- `AuthError` - Base error class for all authentication errors
- `ValidationError` - Input validation failures
- `NetworkError` - Network-related issues
- `UnauthorizedError` - Authentication/authorization failures

### 2. **Input Validation**

The login function validates:
- ✅ Required fields (email and password)
- ✅ Email format using regex
- ✅ Password minimum length (8 characters)
- ✅ Data types
- ✅ Whitespace trimming

### 3. **Network Error Handling**

- ✅ Request timeout (10 seconds)
- ✅ Network connectivity issues
- ✅ Abort controller for cleanup
- ✅ Server errors (5xx status codes)

### 4. **HTTP Status Code Handling**

| Status Code | Error Type | Message |
|------------|------------|---------|
| 401 | UnauthorizedError | Invalid email or password |
| 403 | UnauthorizedError | Account is locked or disabled |
| 429 | AuthError | Too many login attempts |
| 500-504 | NetworkError | Server error |

### 5. **Response Validation**

- ✅ JSON parsing error handling
- ✅ Token presence validation
- ✅ User data validation
- ✅ Graceful handling of missing optional fields

## Usage

### Basic Usage

```typescript
import { login } from './auth';

try {
  const response = await login({
    email: 'user@example.com',
    password: 'securePassword123'
  });

  if (response.success) {
    console.log('Login successful!');
    console.log('Token:', response.token);
    console.log('User:', response.user);
  }
} catch (error) {
  console.error('Login failed:', error);
}
```

### Advanced Error Handling

```typescript
import {
  login,
  ValidationError,
  NetworkError,
  UnauthorizedError,
  AuthError
} from './auth';

async function handleLogin(email: string, password: string) {
  try {
    const response = await login({ email, password });
    
    // Store token securely
    localStorage.setItem('authToken', response.token!);
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
    
  } catch (error) {
    if (error instanceof ValidationError) {
      // Show validation error to user
      showError('Please check your email and password format');
      
    } else if (error instanceof UnauthorizedError) {
      // Show authentication error
      showError('Invalid credentials. Please try again.');
      
    } else if (error instanceof NetworkError) {
      // Show network error
      showError('Connection issue. Please check your internet.');
      
    } else if (error instanceof AuthError) {
      // Show specific error message
      showError(error.message);
      
    } else {
      // Show generic error
      showError('An unexpected error occurred');
    }
  }
}
```

### React Integration Example

```typescript
import { useState } from 'react';
import { login, AuthError } from './auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      if (response.success) {
        // Handle success
        localStorage.setItem('authToken', response.token!);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={loading}
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        disabled={loading}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## Error Codes

All `AuthError` instances include a `code` property for programmatic handling:

```typescript
try {
  await login({ email, password });
} catch (error) {
  if (error instanceof AuthError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        // Handle validation error
        break;
      case 'NETWORK_ERROR':
        // Handle network error
        break;
      case 'UNAUTHORIZED':
        // Handle auth error
        break;
      case 'RATE_LIMIT':
        // Handle rate limiting
        break;
      case 'LOGIN_FAILED':
        // Handle generic login failure
        break;
      case 'PARSE_ERROR':
        // Handle response parsing error
        break;
      case 'INVALID_RESPONSE':
        // Handle invalid server response
        break;
      case 'UNKNOWN_ERROR':
        // Handle unexpected error
        break;
    }
  }
}
```

## Testing

Run the test suite to verify error handling:

```bash
npm test auth.test.ts
```

The test suite covers:
- ✅ Input validation errors
- ✅ Network failures and timeouts
- ✅ HTTP status code handling
- ✅ Response validation
- ✅ Successful login scenarios

## Security Considerations

1. **Password Security**: Passwords are never logged or exposed in error messages
2. **Token Storage**: Store tokens securely (httpOnly cookies recommended)
3. **Rate Limiting**: The function respects 429 status codes
4. **Timeout**: 10-second timeout prevents hanging requests
5. **Error Messages**: Generic messages prevent information leakage

## API Contract

The login function expects the backend API to return:

```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Future Improvements

- [ ] Add retry logic with exponential backoff
- [ ] Support for OAuth providers
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Session management
- [ ] Token refresh mechanism

## Contributing

When modifying the authentication logic:
1. Ensure all error paths are tested
2. Update error codes documentation
3. Maintain backward compatibility
4. Follow TypeScript best practices
