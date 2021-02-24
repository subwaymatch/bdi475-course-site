import randomstring from "randomstring";

export function generateQuestionId() {
  return randomstring.generate(6);
}
