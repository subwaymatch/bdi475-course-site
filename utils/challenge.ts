import {
  ChallengeTypeEnum,
  IChallengeTypeAndId,
  ISimplifiedChallengeTypeAndIds,
} from "types/challenge";

export function getChallengeIdAsNumberFromQuery(
  cid: string | string[]
): number {
  let challengeId = cid
    ? Array.isArray(cid)
      ? Number(cid[0])
      : Number(cid)
    : null;

  return challengeId;
}

export function getMultipleChoiceIds(challenges: IChallengeTypeAndId[]) {
  return challenges
    .filter((o) => o.challengeType === ChallengeTypeEnum.MultipleChoice)
    .map((o) => o.challengeId);
}

export function getPythonChallengeIds(challenges: IChallengeTypeAndId[]) {
  return challenges
    .filter((o) => o.challengeType === ChallengeTypeEnum.PythonChallenge)
    .map((o) => o.challengeId);
}

export function compressForQueryString(
  challenges: IChallengeTypeAndId[]
): ISimplifiedChallengeTypeAndIds {
  return {
    i: challenges.map((o) => o.challengeId),
    t: challenges.map((o) => {
      switch (o.challengeType) {
        case ChallengeTypeEnum.PythonChallenge:
          return "p";
        case ChallengeTypeEnum.MultipleChoice:
          return "m";
        default:
          return "unknown";
      }
    }),
  };
}

export function expandFromQueryObject(
  simplifiedChallenges: ISimplifiedChallengeTypeAndIds
): IChallengeTypeAndId[] {
  return simplifiedChallenges.i.map((id, index) => {
    let challengeType =
      simplifiedChallenges.t[index] === "p"
        ? ChallengeTypeEnum.PythonChallenge
        : ChallengeTypeEnum.MultipleChoice;

    return {
      challengeId: Number(id),
      challengeType,
    };
  });
}
