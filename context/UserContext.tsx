import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import dayjs from "dayjs";

interface IAuthStateChangeBroadcast {
  event: string;
  date: string;
}

const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const { supabaseClient }: { supabaseClient: SupabaseClient } = props;
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Send session to /api/auth route to set the auth cookie.
  // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
  const setAuthCookieOnServer = async (event: string, session: Session) => {
    console.log(`CLIENT: setAuthCookieOnServer(event=${event})`);

    await fetch("/api/auth/setAuthCookie", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const handleStorageEvent = (e) => {
    if (e.key === "authStateChangeEvent") {
      console.log(`RECEIVED: authStateChangeEvent storage broadcast`);

      handleAuthEventBroadcast(e.newValue);
    }
  };

  const handleAuthEventBroadcast = (broadcastStr: string) => {
    console.log(`handleAuthStateChange`);
    console.log(broadcastStr);
    const broadcastedObj: IAuthStateChangeBroadcast = JSON.parse(broadcastStr);
    const event = broadcastedObj.event;
    const broadcastedTime = dayjs(broadcastedObj.date);

    console.log(`user`);
    // Difference in milliseconds
    const session = supabaseClient.auth.session();
    const user = supabaseClient.auth.user();
    console.log(`user session=${!!session}`);
    console.log(`user.email=${user?.email}`);

    if (event === "SIGNED_IN" && !user) {
      router.reload();
    } else if (event === "SIGNED_OUT" && user) {
      router.reload();
    } else if (["USER_UPDATED", "USER_DELETED"].includes(event)) {
      router.reload();
    }
  };

  const broadcastAuthEvent = (event: string) => {
    console.log(`broadcastAuthStateChange event=${event}`);

    if (event !== "PASSWORD_RECOVERY") {
      const broadcastObject: IAuthStateChangeBroadcast = {
        event,
        date: dayjs().toJSON(),
      };

      window.localStorage.setItem(
        "authStateChangeEvent",
        JSON.stringify(broadcastObject)
      );
    }
  };

  useEffect(() => {
    const session = supabaseClient.auth.session();
    const user = supabaseClient.auth.user();

    setSession(session);
    setUser(user);

    console.log(`UserContextProvider.useEffect()`);
    console.log(`Have session? ${!!session}`);
    console.log(`Have user? ${!!user}`);

    // If a session user already exists,
    // manually register auth cookie
    if (session) {
      setAuthCookieOnServer("SIGNED_IN", session);
      broadcastAuthEvent("SIGNED_IN");
    } else {
      setAuthCookieOnServer("SIGNED_OUT", session);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`UserContext.onAuthStateChange event=${event}`);

        setSession(session);
        setUser(session?.user ?? null);
        broadcastAuthEvent(event);

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
