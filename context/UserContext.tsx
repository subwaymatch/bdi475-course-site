import React, { useEffect, useState, createContext, useContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";

const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const { supabaseClient }: { supabaseClient: SupabaseClient } = props;
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  // Send session to /api/auth route to set the auth cookie.
  // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
  const setAuthCookieOnServer = async (event, session) => {
    console.log(`CLIENT: setAuthCookieOnServer(event=${event})`);

    await fetch("/api/auth/setAuthCookie", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const session = supabaseClient.auth.session();
    setSession(session);
    setUser(session?.user ?? null);

    console.log(`UserContextProvider.useEffect()`);
    console.log(`Have session? ${!!session}`);

    // If a session user already exists,
    // manually register auth cookie
    if (session) {
      setAuthCookieOnServer("SIGNED_IN", session);
    } else {
      setAuthCookieOnServer("SIGNED_OUT", session);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`UserContext.onAuthStateChange event=${event}`);

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
