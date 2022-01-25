import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";

interface IChipProps {
  label?: string;
  color?: string;
  small?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Chip({
  label,
  color,
  small,
  children,
  className,
}: IChipProps) {
  return (
    <span
      className={clsx(
        "chip",
        styles.chip,
        {
          [styles[color]]: color,
          [styles.small]: small,
        },
        className
      )}
    >
      {children || label}
    </span>
  );
}
