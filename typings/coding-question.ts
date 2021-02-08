import firebase from "firebase/app";

export default interface ICodingQuestion {
  title: string;
  textMarkdown: string;
  starterCode: string;
  solutionCode?: string;
  testCode: string;
}

export interface ICodingQuestionWithMeta extends ICodingQuestion {
  qid: string;
  createdAt?: Date;
  updatedAt?: Date;
}
