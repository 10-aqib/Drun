"use client";

import React, { createContext, useContext, useState } from "react";
import { safeJson, useStoredValue, writeJson } from "@/lib/localStore";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
  phone?: string;
  address?: string;
  city?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string, role?: "customer" | "admin") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "drun_user";

function parseUser([raw]: (string | null)[]): UserProfile | null {
  const u = safeJson<UserProfile | null>(raw, null);
  return u && typeof u.email === "string" && typeof u.name === "string" ? u : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useStoredValue([USER_KEY], parseUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (
    email: string,
    name: string = "Valued Patron",
    role: "customer" | "admin" = "customer"
  ) => {
    const newUser: UserProfile = {
      id: "usr-" + Math.random().toString(36).substring(2, 9),
      email,
      name,
      role,
      city: "Lahore",
    };
    writeJson(USER_KEY, newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    writeJson(USER_KEY, undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
