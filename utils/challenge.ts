import { IChallengeTypeAndId } from "types/challenge";

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
    .filter((o) => o.challengeType === "multiple-choice")
    .map((o) => o.challengeId);
}

export function getPythonChallengeIds(challenges: IChallengeTypeAndId[]) {
  return challenges
    .filter((o) => o.challengeType === "python-challenge")
    .map((o) => o.challengeId);
}
