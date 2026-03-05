import { useCallback, useState } from 'react';
import { fetchProtectedPing } from '../services/backendService';
import { loginUser, registerUser } from '../services/authService';
import { createLogger } from '../services/logger';

const logger = createLogger('use-auth-flow');

export function useAuthFlow() {
  const [token, setToken] = useState('');
  const [authMeta, setAuthMeta] = useState(null);
  const [protectedResult, setProtectedResult] = useState(null);
  const [loadingAction, setLoadingAction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const register = useCallback(async (input) => {
    setLoadingAction('register');
    setErrorMessage('');
    setProtectedResult(null);

    try {
      const response = await registerUser(input);
      setToken(response.accessToken);
      setAuthMeta(response);
      logger.info('Register succeeded');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setErrorMessage(message);
      logger.error('Register failed', message);
    } finally {
      setLoadingAction('');
    }
  }, []);

  const login = useCallback(async (input) => {
    setLoadingAction('login');
    setErrorMessage('');
    setProtectedResult(null);

    try {
      const response = await loginUser(input);
      setToken(response.accessToken);
      setAuthMeta(response);
      logger.info('Login succeeded');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setErrorMessage(message);
      logger.error('Login failed', message);
    } finally {
      setLoadingAction('');
    }
  }, []);

  const callProtected = useCallback(async () => {
    if (!token.trim()) {
      setErrorMessage('Missing access token. Login first.');
      return;
    }

    setLoadingAction('protected');
    setErrorMessage('');

    try {
      const result = await fetchProtectedPing(token);
      setProtectedResult(result);
      logger.info('Protected call succeeded');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Protected request failed';
      setErrorMessage(message);
      logger.error('Protected call failed', message);
    } finally {
      setLoadingAction('');
    }
  }, [token]);

  return {
    token,
    authMeta,
    protectedResult,
    loadingAction,
    errorMessage,
    clearError,
    register,
    login,
    callProtected,
  };
}
