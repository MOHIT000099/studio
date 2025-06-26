'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firebaseEnabled } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseEnabled: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  firebaseEnabled: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If firebase is not configured, we don't need to check for a user.
    if (!firebaseEnabled) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // We don't show a loader here anymore because individual pages
  // that need auth will handle their own loading states.
  // This prevents a full-screen loader on every page load.

  return (
    <AuthContext.Provider value={{ user, loading, firebaseEnabled }}>
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
