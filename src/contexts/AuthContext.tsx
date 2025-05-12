
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'assistant';
  pharmacyName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

interface SignupData {
  pharmacyName: string;
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('livepharma_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    
    // This is a simple mock login that always succeeds
    // In a real app, this would check credentials with a backend
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // Mock user data - will work with ANY email and password
    const mockUser: User = {
      id: '1',
      name: 'Pharmacy User',
      email,
      role: 'admin',
      pharmacyName: 'Livepharma'
    };
    
    setUser(mockUser);
    
    if (remember) {
      localStorage.setItem('livepharma_user', JSON.stringify(mockUser));
    }
    
    setIsLoading(false);
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    
    // This would be an API call in a real app
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: data.name,
      email: data.email,
      role: 'admin',
      pharmacyName: data.pharmacyName
    };
    
    setUser(mockUser);
    localStorage.setItem('livepharma_user', JSON.stringify(mockUser));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('livepharma_user');
  };

  const forgotPassword = async (email: string) => {
    // This would be an API call in a real app
    await new Promise(resolve => setTimeout(resolve, 500));
    // Success is assumed
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
