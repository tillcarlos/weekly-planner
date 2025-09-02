// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isSuperAdmin: boolean;
  accountStatus: 'pending' | 'active' | 'terminated' | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Mock user for development - no actual authentication
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'dev@example.com',
    username: 'developer',
    role: 'member',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as User);
  
  const [isLoading] = useState(false);

  const isSuperAdmin = false;
  const accountStatus = 'active';

  const login = async (email: string, password: string) => {
    // Mock login - always succeeds for development
    setUser({
      id: '1',
      email,
      username: email.split('@')[0],
      role: 'member',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as User);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isSuperAdmin, accountStatus }}>
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