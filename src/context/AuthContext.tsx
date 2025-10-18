import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateAdminCredentials, getAdminUser, setAdminUser, AdminUser } from '@/lib/supabaseData';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<void>;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's an active session
    const session = sessionStorage.getItem('admin_session');
    if (session) {
      const sessionData = JSON.parse(session);
      setIsAuthenticated(true);
      setUsername(sessionData.username);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const isValid = await validateAdminCredentials(username, password);
    if (isValid) {
      setIsAuthenticated(true);
      setUsername(username);
      sessionStorage.setItem('admin_session', JSON.stringify({ username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    sessionStorage.removeItem('admin_session');
  };

  const changePassword = async (newPassword: string) => {
    const currentUser = await getAdminUser();
    if (currentUser && username) {
      const updatedUser: AdminUser = {
        username: currentUser.username,
        password: newPassword,
      };
      await setAdminUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

