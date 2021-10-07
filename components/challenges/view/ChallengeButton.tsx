import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { IconType } from "react-icons";
import { isMobile } from "react-device-detect";
import styles from "./ChallengeButton.module.scss";

interface IChallengeButtonProps {
  className: string;
  tooltip?: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
  IconComponent?: IconType;
}

export default function ChallengeButton({
  className,
  tooltip,
  label,
  disabled,
  onClick,
  IconComponent,
}: IChallengeButtonProps) {
  return (
    <Tippy
      content={tooltip}
      className="tippy"
      placement="bottom"
      offset={[0, -4]}
      theme="light"
      disabled={!tooltip || isMobile}
    >
      <div
        className={clsx(styles.button, {
          [className]: !!className,
          [styles.disabled]: disabled,
        })}
        onClick={async (e) => {
          e.preventDefault();

          if (disabled) {
            return;
          }

          onClick();
        }}
      >
        {IconComponent && <IconComponent className={styles.reactIcon} />}
        <span className={styles.label}>{label}</span>
      </div>
    </Tippy>
  );
}
