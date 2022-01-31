export interface IMultipleChoiceQuestionWithOptions {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  text_markdown: string;
  options: IMultipleChoiceOption[];
  num_correct_options: number;
}

export interface IMultipleChoiceOption {
  id: number;
  text_markdown: string;
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
