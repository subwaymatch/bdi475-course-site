import { ChallengeTypeEnum, IChallengeTypeAndId } from "types/challenge";

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

export function getChallengeTypeDisplayName(challengeTypeStr: string) {
  const challengeStringMap = {
    "python-challenge": "Python",
    "multiple-choice": "MCQ",
  };

  return challengeStringMap.hasOwnProperty(challengeTypeStr)
    ? challengeStringMap[challengeTypeStr]
    : "Unknown";
}

export function getMultipleChoiceIds(challenges: IChallengeTypeAndId[]) {
  return challenges
    ?.filter((o) => o.challengeType === ChallengeTypeEnum.MultipleChoice)
    .map((o) => o.challengeId);
}

export function getPythonChallengeIds(challenges: IChallengeTypeAndId[]) {
  return challenges
    ?.filter((o) => o.challengeType === ChallengeTypeEnum.PythonChallenge)
    .map((o) => o.challengeId);
}
