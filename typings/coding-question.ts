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
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export interface ICodingQuestionAttempt {
  isSuccess: boolean;
  userCode: string;
  submittedAt?: firebase.firestore.Timestamp;
}

export interface ICodingQuestionAttemptWithUID extends ICodingQuestionAttempt {
  uid: string;
  displayName?: string;
}
