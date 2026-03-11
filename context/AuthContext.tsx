"use client";
// context/AuthContext.tsx
// Auth state Context API se manage hoga — login, logout, profile, role checks

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@/supabase/client";
import type { Profile } from "@/types";

// ─── Context shape ──────────────────────────────────────────────────────────
interface AuthContextValue {
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  canAccessDashboard: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ─── Create context ──────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  console.log(profile);

  const refreshProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data ?? null);
    setLoading(false);
  }, [supabase]);

  // Pehli baar load karo
  useEffect(() => {
    refreshProfile();

    // Auth state change pe profile update karo
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshProfile();
    });

    return () => subscription.unsubscribe();
  }, [refreshProfile, supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
    window.location.href = "/";
  }, [supabase]);

  const isAdmin = profile?.role === "admin";
  const isEditor = profile?.role === "editor";
  const canAccessDashboard = isAdmin || isEditor;

  return (
    <AuthContext.Provider
      value={{
        profile,
        loading,
        isAdmin,
        isEditor,
        canAccessDashboard,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
