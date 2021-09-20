import clsx from "clsx";
import styles from "./MultipleChoiceOption.module.scss";
import { parseMarkdown } from "lib/unified";

interface IMultipleChoiceOptionProps {
  isSelected: boolean;
  disabled: boolean;
  textMarkdown: string;
  onClick: () => void;
  showResult: boolean;
  isCorrectAnswer: boolean;
}

export default function MultipleChoiceOption({
  isSelected,
  disabled,
  onClick,
  textMarkdown,
  showResult,
  isCorrectAnswer,
}: IMultipleChoiceOptionProps) {
  return (
    <div
      className={clsx(styles.optionItem, {
        [styles.isSelected]: isSelected,
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className={styles.optionCheckbox}>
        {isSelected && <span>→</span>}
      </div>

      <div
        className={styles.optionMarkdown}
        dangerouslySetInnerHTML={{
          __html: parseMarkdown(textMarkdown),
        }}
      />
    </div>
  );
}
