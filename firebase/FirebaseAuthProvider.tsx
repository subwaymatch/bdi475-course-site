import { useState, useEffect, createContext } from "react";
import { firebaseClient } from "./firebaseClient";
import nookies from "nookies";

interface UserCustomClaims {
  admin: boolean;
  [field: string]: any;
}

const defaultClaims: UserCustomClaims = {
  admin: false,
};

// Create a custom Firebase Auth context to sync sign-ins and sign-outs
// across multiple tabs
export const FirebaseAuthContext = createContext<{
  user: firebaseClient.User | null;
  claims: UserCustomClaims;
}>({
  user: null,
  claims: defaultClaims,
});

export default function FirebaseAuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);
  const [claims, setClaims] = useState<UserCustomClaims>(defaultClaims);

  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      setUser(user);

      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          setClaims(idTokenResult.claims as UserCustomClaims);
        });
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
      } else {
        setClaims(defaultClaims);
        nookies.set(undefined, "token", "", { path: "/" });
      }
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user, claims }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}
