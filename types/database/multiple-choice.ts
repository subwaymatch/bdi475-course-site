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
