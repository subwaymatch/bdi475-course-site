import marked from "marked";
import styles from "./InstructionText.module.scss";
import clsx from "clsx";

interface IInstructionTextProps {
  labelText: string;
  textMarkdown: string;
  className?: string;
}

export default function InstructionText({
  labelText,
  textMarkdown,
  className,
}: IInstructionTextProps) {
  return (
    <div
      className={clsx(styles.instructionTextWrapper, {
        [className]: !!className,
      })}
    >
      <div className={styles.instructionTextInner}>
        <span className="label green">{labelText}</span>

        <div
          className={styles.textMarkdown}
          dangerouslySetInnerHTML={{
            __html: marked(textMarkdown),
          }}
        />
      </div>
    </div>
  );
}
