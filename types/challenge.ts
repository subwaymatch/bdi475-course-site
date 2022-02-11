export enum ChallengeTypeEnum {
  PythonChallenge = "python-challenge",
  MultipleChoice = "multiple-choice",
}

export interface IChallengeTypeAndId {
  challengeType: ChallengeTypeEnum;
  challengeId: number;
}

export interface IChallengeResult {
  uid: string;
  email: string;
  display_name: string;
  challenge_type: string;
  challenge_id: number;
  challenge_title: string;
  success_count: number;
  fail_count: number;
  total_count: number;
  first_success: string;
}

export interface IChallengeResultSummary {
  uid: string;
  email: string;
  display_name: string;
  num_correct: number;
  num_challenges: number;
  percentage: number;
  last_success: string;
}
