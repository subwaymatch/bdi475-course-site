import React, { createContext } from "react";
import { IMultipleChoiceQuestionWithOptions } from "types/database/multiple-choice";
import { IChallengeResult, IChallengeTypeAndId } from "types/challenge";
import { definitions } from "types/database";
import useMultipleChoiceQuestions from "hooks/useMultipleChoiceQuestions";
import usePythonChallenges from "hooks/usePythonChallenges";
import useChallengeResults from "hooks/useChallengeResults";
import { getMultipleChoiceIds, getPythonChallengeIds } from "utils/challenge";

export interface IChallengesContext {
  challenges: IChallengeTypeAndId[];
  multipleChoiceQuestions: IMultipleChoiceQuestionWithOptions[];
  pythonChallenges: definitions["coding_challenges"][];
  challengeResults: IChallengeResult[];
}

const ChallengesContext = createContext<IChallengesContext>({
  challenges: null,
  multipleChoiceQuestions: null,
  pythonChallenges: null,
  challengeResults: null,
});

export const ChallengesContextProvider = (props: {
  challenges: IChallengeTypeAndId[];
  [x: string]: any;
}) => {
  const { challenges } = props;

  const multipleChoiceIds = getMultipleChoiceIds(challenges);
  const pythonChallengeIds = getPythonChallengeIds(challenges);

  const { data: multipleChoiceQuestions } =
    useMultipleChoiceQuestions(multipleChoiceIds);
  const { data: pythonChallenges } = usePythonChallenges(pythonChallengeIds);
  const { data: challengeResults } = useChallengeResults(challenges);

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        multipleChoiceQuestions,
        pythonChallenges,
        challengeResults,
      }}
      {...props}
    />
  );
};

export default ChallengesContext;
