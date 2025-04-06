import { createContext, useContext, useEffect, useState } from 'react';
import RefreshAuth from '../../action/RefreshAuth.js';
import Login from '../../action/Login.js';
import Register from '../../action/Register.js';

const AuthenticationContext = createContext({
  isAuthenticated: undefined,
  login: () => null,
  register: () => null,
});

export function AuthenticationProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState();

  const login = (body) => {
    return Login(body).then(setAuthenticated);
  };

  const register = (body) => {
    return Register(body).then(setAuthenticated);
  };

  // Try refreshing token on page load
  useEffect(() => {
    RefreshAuth().then(setAuthenticated);
  }, []);

  // Try refreshing token every minutes
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        RefreshAuth().then(setAuthenticated);
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, login, register }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthentication() {
  return useContext(AuthenticationContext);
}
