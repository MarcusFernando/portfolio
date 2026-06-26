'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLogged: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  signup: (name: string, email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('yt_user');
    const logged = localStorage.getItem('yt_logged');
    if (savedUser && logged === 'true') {
      setUser(JSON.parse(savedUser));
      setIsLogged(true);
    }
  }, []);

  const login = (email: string, name: string = 'Marcus Fernando') => {
    const userData = { name, email };
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem('yt_user', JSON.stringify(userData));
    localStorage.setItem('yt_logged', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem('yt_user');
    localStorage.removeItem('yt_logged');
  };

  const signup = (name: string, email: string): boolean => {
    // Simulação de cadastro
    if (name && email) {
      login(email, name);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
