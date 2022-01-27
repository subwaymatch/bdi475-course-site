import fs from "fs";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "_lecture_notes");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export function replaceShortcodes(mdxStr: string): string {
  let replacedStr = mdxStr.replace(
    /(\[python-challenge )(\d+)(\])/gim,
    "<RecordedPythonChallengeById challengeId={$2} />"
  );

  replacedStr = replacedStr.replace(
    /(\[multiple-choice )(\d+)(\])/gim,
    "<RecordedMultipleChoiceQuestionById questionId={$2} />"
  );

  return replacedStr;
}
