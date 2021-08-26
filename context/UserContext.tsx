import React, { useEffect, useState, createContext, useContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";

interface IAuthStateChangeBroadcast {
  event: string;
  date: string;
}

const UserContext = createContext({ user: null, session: null, roles: [] });

export const UserContextProvider = (props) => {
  const { supabaseClient }: { supabaseClient: SupabaseClient } = props;
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

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

  const update = async (newSession) => {
    setSession(newSession);

    const newUser = newSession ? newSession.user : supabaseClient.auth.user();
    setUser(newUser);

    if (newUser) {
      const selectResult = await supabaseClient
        .from("profiles")
        .select("roles")
        .eq("id", newUser.id)
        .single();

      setRoles(selectResult.data.roles);
    } else {
      setRoles([]);
    }
  };

  const handleStorageEvent = (e) => {
    if (e.key === "supabase.auth.token") {
      const newSession = JSON.parse(e.newValue);
      const currentSession = newSession?.currentSession;
      const roles = update(currentSession);
    }
  };

  useEffect(() => {
    const session = supabaseClient.auth.session();

    update(session);

    // If a session user already exists,
    // manually register auth cookie
    if (session) {
      setAuthCookieOnServer("SIGNED_IN", session);
    } else {
      setAuthCookieOnServer("SIGNED_OUT", session);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        update(session);

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

  const value: {
    session: Session;
    user: User;
    roles: string[];
  } = {
    session,
    user,
    roles,
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
