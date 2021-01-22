import { useState, useEffect, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "./firebaseClient";

export const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }

    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`FB Id Token changed`);

      if (!user) {
        console.log(`No token found...`);
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {});
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.destroy(null, "token");
        nookies.set(null, "token", token, {});
      }
    });
  }, []);

  // Force token refresh every 10 minutes
  useEffect(() => {
    const refreshHandle = setInterval(async () => {
      console.log(`Refreshing token...`);
      const user = firebaseClient.auth().currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshHandle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
