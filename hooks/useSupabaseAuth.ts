import UserContext from "context/UserContext";
import { useContext } from "react";

const useSupabaseAuth = () => {
  const context = useContext(UserContext);

  if (typeof context === "undefined") {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  return context;
};

export default useSupabaseAuth;
