import { definitions } from "types/database";

export interface IMultipleChoiceQuestionWithOptions {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  text_markdown: string;
  options: definitions["multiple_choice_options"][];
  num_correct_options: number;
}
