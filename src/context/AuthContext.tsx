import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_KEY } from "@/src/env";

type User = {
  id: string;
  username: string;
  fullName: string;
  cpf: string;
  email: string;
};

type StoredUser = {
  user: User;
  password: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  register: (user: User, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem(AUTH_KEY);
        const storedUser = await AsyncStorage.getItem("sessionUser");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const stored = await AsyncStorage.getItem(email);
    if (!stored) return false;

    const parsed: StoredUser = JSON.parse(stored);
    if (parsed.password !== password) return false;

    const fakeJwt = "demo-" + Math.random().toString(36).slice(2);

    await AsyncStorage.setItem(AUTH_KEY, fakeJwt);
    await AsyncStorage.setItem("sessionUser", JSON.stringify(parsed.user));

    setToken(fakeJwt);
    setUser(parsed.user);

    return true;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    await AsyncStorage.removeItem("sessionUser");
    setToken(null);
    setUser(null);
  };

  const register = async (newUser: User, password: string) => {
    const data: StoredUser = { user: newUser, password };
    await AsyncStorage.setItem(newUser.email, JSON.stringify(data));
  };

  const value = useMemo(
    () => ({ token, user, isLoading, signIn, signOut, register }),
    [token, user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
