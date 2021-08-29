export function getChallengeIdAsNumberFromQuery (cid: string | string[]): number {
  let challengeId = cid
  ? Array.isArray(cid)
    ? Number(cid[0])
    : Number(cid)
  : null;

  return challengeId;
}