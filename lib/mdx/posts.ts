import fs from "fs";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "_lecture_notes");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

interface IChallengeTypeAndId {
  challengeType: string;
  challengeId: number;
}

export function processShortcodes(mdxStr: string): {
  replacedStr: string;
  challenges: IChallengeTypeAndId[];
} {
  let allChallengeRegex = /\[(multiple-choice|python-challenge) (\d+)\]/gim;
  let pythonChallengeRegex = /\[python-challenge (\d+)\]/gim;
  let multipleChoiceRegex = /\[multiple-choice (\d+)\]/gim;

  // @ts-ignore: Type 'IterableIterator<RegExpMatchArray>' is not an array type or a string type.
  let challenges = [...mdxStr.matchAll(allChallengeRegex)].map((m) => ({
    challengeType: m[1],
    challengeId: Number.parseInt(m[2]),
  }));

  let replacedStr = mdxStr.replace(
    pythonChallengeRegex,
    "<RecordedPythonChallenge challengeId={$1} />"
  );

  replacedStr = replacedStr.replace(
    multipleChoiceRegex,
    "<RecordedMultipleChoiceQuestion questionId={$1} />"
  );

  return {
    replacedStr,
    challenges,
  };
}
