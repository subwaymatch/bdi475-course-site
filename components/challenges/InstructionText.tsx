import { forwardRef } from "react";
import marked from "marked";
import styles from "./InstructionText.module.scss";
import clsx from "clsx";

interface IInstructionTextProps {
  labelText: string;
  textMarkdown: string;
  className?: string;
}

const InstructionText = forwardRef<HTMLDivElement, IInstructionTextProps>(
  ({ labelText, textMarkdown, className }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.instructionTextWrapper, {
        [className]: !!className,
      })}
    >
      <div className={styles.instructionTextInner}>
        <span className="label small whiteText blue">{labelText}</span>

        <div
          className={styles.textMarkdown}
          dangerouslySetInnerHTML={{
            __html: marked(textMarkdown),
          }}
        />
      </div>
    </div>
  )
);

export default InstructionText;
