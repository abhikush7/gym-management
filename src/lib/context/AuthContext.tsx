'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthChange, getUserData } from '../firebase/auth';
import { User } from '../types';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  isAdmin: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  userData: null,
  loading: true,
  isAdmin: false,
  isClient: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthChange(async (user) => {
        setFirebaseUser(user);
        if (user) {
          const data = await getUserData(user.uid);
          setUserData(data);
        } else {
          setUserData(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch {
      setLoading(false);
      return () => {};
    }
  }, []);

  const isAdmin = userData?.role === 'admin';
  const isClient = userData?.role === 'client';

  return (
    <AuthContext.Provider value={{ firebaseUser, userData, loading, isAdmin, isClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
