import { useState, useEffect, useCallback } from 'react';
import { isAuthenticated, setAuthenticated, logout as authLogout, verifyAccessCode } from '@/lib/auth';

/**
 * Hook per la gestione dell'autenticazione.
 */
export function useAuth() {
  const [authenticated, setAuthenticatedState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Controlla lo stato di autenticazione al mount
  useEffect(() => {
    setAuthenticatedState(isAuthenticated());
    setIsLoading(false);
  }, []);

  // Funzione di login
  const login = useCallback(async (code: string): Promise<boolean> => {
    const isValid = await verifyAccessCode(code);
    if (isValid) {
      setAuthenticated(true);
      setAuthenticatedState(true);
    }
    return isValid;
  }, []);

  // Funzione di logout
  const logout = useCallback(() => {
    authLogout();
    setAuthenticatedState(false);
  }, []);

  return {
    authenticated,
    isLoading,
    login,
    logout
  };
}
