import { forwardRef } from "react";
import styles from "./InstructionText.module.scss";
import clsx from "clsx";
import { parseMarkdown } from "lib/unified";

interface IInstructionTextProps {
  isLoading: boolean;
  labelText: string;
  textMarkdown: string;
  className?: string;
}

const InstructionText = forwardRef<HTMLDivElement, IInstructionTextProps>(
  ({ isLoading, labelText, textMarkdown, className }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.instructionTextWrapper, {
        [className]: !!className,
      })}
    >
      <div className={styles.instructionTextInner}>
        <span className="label small whiteText blue">{labelText}</span>

        {isLoading ? (
          <div className={styles.textMarkdown}>Loading</div>
        ) : (
          <div
            className={styles.textMarkdown}
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(textMarkdown),
            }}
          />
        )}
      </div>
    </div>
  )
);

export default InstructionText;
