import firebase from "firebase/app";

export default interface IPythonExercise {
  title: string;
  textMarkdown: string;
  starterCode: string;
  solutionCode?: string;
  testCode: string;
}

export interface IPythonExerciseWithMeta extends IPythonExercise {
  qid: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export interface ICodingExerciseAttempt {
  isSuccess: boolean;
  userCode: string;
  submittedAt?: firebase.firestore.Timestamp;
}

export interface ICodingExerciseAttemptWithUID extends ICodingExerciseAttempt {
  uid: string;
  displayName?: string;
}
