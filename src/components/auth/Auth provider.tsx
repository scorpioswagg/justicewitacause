import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type ProfileStatus = "pending" | "approved" | "rejected";
export type ProfileRole = "user" | "admin";

export type Profile = {
  user_id: string;
  status: ProfileStatus;
  role: ProfileRole;
  display_name: string | null;
  created_at: string;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ensureProfile = async (user: User) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, status, role, display_name, created_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data) {
    return data as Profile;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("profiles")
    .insert({
      user_id: user.id,
      status: "pending",
      role: "user",
    })
    .select("user_id, status, role, display_name, created_at")
    .single();

  if (insertError) {
    throw insertError;
  }

  return inserted as Profile;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(
    async (nextUser: User | null) => {
      if (!nextUser) {
        setProfile(null);
        return;
      }

      const profileData = await ensureProfile(nextUser);
      setProfile(profileData);
    },
    []
  );

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    await fetchProfile(user);
  }, [fetchProfile, user]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      try {
        await fetchProfile(data.session?.user ?? null);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    void initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      try {
        await fetchProfile(nextSession?.user ?? null);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      refreshProfile,
      signOut,
    }),
    [loading, profile, refreshProfile, session, signOut, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
