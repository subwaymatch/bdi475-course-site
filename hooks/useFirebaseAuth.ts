import { useContext } from "react";
import { FirebaseAuthContext } from "firebase/FirebaseAuthProvider";

const useFirebaseAuth = () => {
  return useContext(FirebaseAuthContext);
};

export default useFirebaseAuth;
