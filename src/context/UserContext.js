'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/userauth', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
                                                                               
  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/userauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user || null);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/userauth', {
        method: 'DELETE',
        credentials: 'include'
      });
      setUser(null);
      router.push('/auth/log-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, checkAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};