export default interface IPythonExercise {
  title: string;
  textMarkdown: string;
  starterCode: string;
  testCode: string;
}

export interface ICodingExerciseAttempt {
  isSuccess: boolean;
  userCode: string;
  submittedAt?: Date;
}

export interface ICodingExerciseAttemptWithUID extends ICodingExerciseAttempt {
  uid: string;
  displayName?: string;
}
