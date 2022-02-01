import ChallengesContext from "context/ChallengesContext";
import { useContext } from "react";

const useChallenges = () => {
  const context = useContext(ChallengesContext);

  if (typeof context === "undefined") {
    throw new Error(
      `useChallenges must be used within a ChallengesDataContext.`
    );
  }

  return context;
};

export default useChallenges;
