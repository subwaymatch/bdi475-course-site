import fs from "fs";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "_lecture_notes");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export function processShortcodes(mdxStr: string): {
  replacedStr: string;
  multipleChoiceIds: number[];
  pythonChallengeIds: number[];
} {
  let pythonChallengeRegex = /\[python-challenge (\d+)\]/gim;
  let multipleChoiceRegex = /\[multiple-choice (\d+)\]/gim;

  // @ts-ignore: Type 'IterableIterator<RegExpMatchArray>' is not an array type or a string type.
  const pythonChallengeIds = [...mdxStr.matchAll(pythonChallengeRegex)].map(
    (m) => Number.parseInt(m[1])
  );

  // @ts-ignore: Type 'IterableIterator<RegExpMatchArray>' is not an array type or a string type.
  const multipleChoiceIds = [...mdxStr.matchAll(multipleChoiceRegex)].map((m) =>
    Number.parseInt(m[1])
  );

  let replacedStr = mdxStr.replace(
    pythonChallengeRegex,
    "<RecordedPythonChallengeById challengeId={$1} />"
  );

  replacedStr = replacedStr.replace(
    multipleChoiceRegex,
    "<RecordedMultipleChoiceQuestionById questionId={$1} />"
  );

  return {
    replacedStr,
    pythonChallengeIds,
    multipleChoiceIds,
  };
}
