import React, { useEffect, useState, createContext } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import {
  IChallengeResult,
  IMultipleChoiceQuestionWithOptions,
} from "types/database/multiple-choice";
import { definitions } from "types/database";
import useMultipleChoiceQuestions from "hooks/useMultipleChoiceQuestions";
import usePythonChallenges from "hooks/usePythonChallenges";
import useChallengeResults from "hooks/useChallengeResults";

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
  const { multipleChoiceIds, pythonChallengeIds } = props;

  const { data: multipleChoiceQuestions } =
    useMultipleChoiceQuestions(multipleChoiceIds);
  const { data: pythonChallenges } = usePythonChallenges(pythonChallengeIds);
  const { data: challengeResults } = useChallengeResults({
    multipleChoiceIds,
    pythonChallengeIds,
  });

  return (
    <ChallengesContext.Provider
      value={{
        multipleChoiceQuestions,
        pythonChallenges,
        challengeResults,
      }}
      {...props}
    />
  );
};

export default ChallengesContext;
