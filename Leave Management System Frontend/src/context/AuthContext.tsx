import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  profilePicture: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock user data
  const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    role: 'Staff',
    department: 'Engineering',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  };

  // Check for existing session on load
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // For development purposes, auto-login
  useEffect(() => {
    if (!user && !loading) {
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    }
  }, [loading]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error('Please enter email and password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error('Please enter email and password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    signIn,
    signUp,
    signOut,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
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