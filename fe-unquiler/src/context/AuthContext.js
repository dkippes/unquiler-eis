import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(window.localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = user => {
    setUser(user);
  };

  const logout = user => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
