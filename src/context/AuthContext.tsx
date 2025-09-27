import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AUTH_KEY } from '@/src/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_KEY);
        if (stored) setToken(stored);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
  if (!email || !password) throw new Error('Informe e-mail e senha');

  // Verifica usuário no SecureStore
  const safeKey = `user_${email.trim().replace(/[^a-zA-Z0-9]/g, "")}`;
  const storedUser = await SecureStore.getItemAsync(safeKey);
  if (!storedUser) throw new Error('Usuário não encontrado');

  const user = JSON.parse(storedUser);
  if (user.password !== password) throw new Error('Senha incorreta');

  const fakeJwt = 'demo-' + Math.random().toString(36).slice(2);
  await AsyncStorage.setItem(AUTH_KEY, fakeJwt); // token persistido
  setToken(fakeJwt); // ✅ atualiza o AuthContext
};


  const signOut = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setToken(null);
  };

  const value = useMemo(() => ({ token, isLoading, signIn, signOut }), [token, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
