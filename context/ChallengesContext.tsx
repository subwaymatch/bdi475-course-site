import React, { useEffect, useState, createContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import {
  IChallengeResult,
  IMultipleChoiceQuestionWithOptions,
} from "types/database/multiple-choice";
import { definitions } from "types/database";
import useMultipleChoiceQuestions from "hooks/useMultipleChoiceQuestions";
import usePythonChallenges from "hooks/usePythonChallenges";

export interface IChallengesContext {
  multipleChoiceQuestions: IMultipleChoiceQuestionWithOptions[];
  pythonChallenges: definitions["coding_challenges"][];
  challengeResults: IChallengeResult[];
}

const ChallengesContext = createContext<IChallengesContext>({
  multipleChoiceQuestions: null,
  pythonChallenges: null,
  challengeResults: null,
});

export const ChallengesContextProvider = (props: {
  multipleChoiceIds: number[];
  pythonChallengeIds: number[];
  [x: string]: any;
}) => {
  const { data: multipleChoiceQuestions } = useMultipleChoiceQuestions(
    props.multipleChoiceIds
  );
  const { data: pythonChallenges } = usePythonChallenges(
    props.pythonChallengeIds
  );

  console.log("ChallengeContext");
  console.log(`multipleChoiceQuestions`);
  console.log(multipleChoiceQuestions);

  console.log(`pythonChallenges`);
  console.log(pythonChallenges);

  return (
    <ChallengesContext.Provider
      value={{
        multipleChoiceQuestions,
        pythonChallenges,
        challengeResults: null,
      }}
      {...props}
    />
  );
};

export default ChallengesContext;
