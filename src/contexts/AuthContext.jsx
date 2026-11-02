import { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, getUserLogged, putAccessToken } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function init() {
      const token = getAccessToken();
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const user = await getUserLogged();
        setAuthedUser(user);
      } catch (error) {
        putAccessToken('');
      } finally {
        setInitializing(false);
      }
    }
    init();
  }, []);

  const login = async ({ email, password }) => {
    const token = await import('../utils/api').then((m) => m.login({ email, password }));
    putAccessToken(token);
    const user = await getUserLogged();
    setAuthedUser(user);
  };

  const logout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  return (
    <AuthContext.Provider value={{ authedUser, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}