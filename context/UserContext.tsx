import React, { useEffect, useState, createContext, useContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";

interface IAuthStateChangeBroadcast {
  event: string;
  date: string;
}

const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const { supabaseClient }: { supabaseClient: SupabaseClient } = props;
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  // Send session to /api/auth route to set the auth cookie.
  // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
  const setAuthCookieOnServer = async (event: string, session: Session) => {
    await fetch("/api/auth/setAuthCookie", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const handleStorageEvent = (e) => {
    if (e.key === "supabase.auth.token") {
      const newSession = JSON.parse(e.newValue);
      const session = newSession?.currentSession;
      setSession(newSession?.currentSession);
      setUser(session?.user ?? null);
    }
  };

  useEffect(() => {
    const session = supabaseClient.auth.session();
    const user = supabaseClient.auth.user();

    setSession(session);
    setUser(user);

    // If a session user already exists,
    // manually register auth cookie
    if (session) {
      setAuthCookieOnServer("SIGNED_IN", session);
    } else {
      setAuthCookieOnServer("SIGNED_OUT", session);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        await setAuthCookieOnServer(event, session);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const value = {
    session,
    user,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  return context;
};
