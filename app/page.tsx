"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import AuthPage from "./components/AuthPage";
import Main from "./components/Main";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active sessions on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for changes (sign-in, sign-out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[url('/main-bg.png')] bg-fixed bg-cover min-h-screen pb-5">
      {!session ? <AuthPage /> : <Main />}
    </div>
  );
}
