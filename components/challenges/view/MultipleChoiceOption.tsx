import clsx from "clsx";
import styles from "./MultipleChoiceOption.module.scss";
import { parseMarkdown } from "lib/markdown";
import { definitions } from "types/database";
import { IMultipleChoiceOption } from "types/database/multiple-choice";

interface IMultipleChoiceOptionProps {
  isSelected: boolean;
  disabled: boolean;
  optionData: IMultipleChoiceOption;
  answerData: definitions["multiple_choice_options"];
  onClick: () => void;
  showResult: boolean;
}

export default function MultipleChoiceOption({
  isSelected,
  disabled,
  onClick,
  optionData,
  answerData,
  showResult,
}: IMultipleChoiceOptionProps) {
  const isUserCorrect = answerData
    ? isSelected === answerData.is_correct
    : false;

  return (
    <div
      className={clsx(styles.optionItem, {
        [styles.disabled]: disabled,
        [styles.isSelected]: isSelected,
        [styles.isNotSelected]: !isSelected,
        [styles.showResult]: showResult,
        [styles.highlighted]:
          showResult && (isSelected || answerData?.is_correct),
        [styles.isCorrectOption]: answerData?.is_correct,
        [styles.isUserCorrect]: isSelected && isUserCorrect,
        [styles.isUserIncorrect]: isSelected && !isUserCorrect,
      })}
      onClick={(e) => {
        e.preventDefault();

        // If disabled or in result-view, do nothing
        if (disabled || showResult) {
          return;
        }

        onClick();
      }}
    >
      <div className={styles.optionCheckbox}>
        <span>
          {!showResult && isSelected && "→"}
          {showResult && isSelected && (isUserCorrect ? "✓" : "✗")}
        </span>
      </div>

      <div
        className={styles.optionMarkdown}
        dangerouslySetInnerHTML={{
          __html: parseMarkdown(optionData.text_markdown),
        }}
      />
    </div>
  );
}
