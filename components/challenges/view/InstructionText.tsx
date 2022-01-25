import { forwardRef } from "react";
import styles from "./InstructionText.module.scss";
import clsx from "clsx";
import { parseMarkdown } from "lib/markdown";
import Chip from "components/common/Chip";

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
        {labelText && (
          <Chip color="black" small>
            {labelText}
          </Chip>
        )}

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
