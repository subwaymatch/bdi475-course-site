import { useState, useEffect, createContext } from "react";
import { firebaseClient } from "./firebaseClient";
import { toast } from "react-toastify";
import { useIdTokenResult } from "reactfire";

// Create a custom Firebase Auth context to sync sign-ins and sign-outs
// across multiple tabs
export const FirebaseAuthContext = createContext<{
  user: firebaseClient.User | null;
}>({
  user: null,
});

export default function FirebaseAuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  useEffect(() => {
    return firebaseClient.auth().onAuthStateChanged(async (user) => {
      setUser(user);

      console.log(`onAuthStateChanged`);
      console.log(user);
      // if (user) {
      //   toast.success(`Signed in as ${user.email}`);
      // } else {
      //   toast.info(`Successfully signed out`);
      // }
    });
  }, []);

  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`onIdTokenChanged`);
      console.log(user);

      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          console.log(idTokenResult.claims);
        });
      } else {
      }
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}
