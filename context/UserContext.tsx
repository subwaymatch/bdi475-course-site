import React, { useEffect, useState, createContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";

export interface IUserContext {
  user: User;
  session: Session;
  roles: string[];
}

const UserContext = createContext<IUserContext>({
  user: null,
  session: null,
  roles: [],
});

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

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`onAuthStateChange, event=${event}`);
        console.log(session);

        setAuthCookieOnServer(event, session);

        update(session);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  console.log(`roles=${JSON.stringify(roles)}`);

  const value: IUserContext = {
    session,
    user,
    roles,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserContext;
