import glob from "glob";
import { IChallengeTypeAndId } from "types/challenge";

const GLOB_STR = "_mdx_posts/**/*.mdx";
export const postFilePaths = glob.sync(GLOB_STR);

export function extractChallenges(mdxStr: string): IChallengeTypeAndId[] {
  let allChallengeRegex = /\[(multiple-choice|python-challenge) (\d+)/gim;

  // @ts-ignore: Type 'IterableIterator<RegExpMatchArray>' is not an array type or a string type.
  const challenges = [...mdxStr.matchAll(allChallengeRegex)].map((m) => ({
    challengeType: m[1],
    challengeId: Number.parseInt(m[2]),
  }));

  return challenges;
}

export function processShortcodes(mdxStr: string): string {
  let pythonChallengeHideSolutionRegex =
    /\[python-challenge (\d+) hide-solution\]/gim;
  let pythonChallengeRegex = /\[python-challenge (\d+)(.*)\]/gim;
  let multipleChoiceRegex = /\[multiple-choice (\d+)\]/gim;

  let replacedStr = mdxStr.replace(
    pythonChallengeHideSolutionRegex,
    "[python-challenge $1 showSolution={false}]"
  );

  replacedStr = replacedStr.replace(
    pythonChallengeRegex,
    "<RecordedPythonChallenge challengeId={$1}$2/>"
  );

  replacedStr = replacedStr.replace(
    multipleChoiceRegex,
    "<RecordedMultipleChoiceQuestion questionId={$1} />"
  );

  return replacedStr;
}
