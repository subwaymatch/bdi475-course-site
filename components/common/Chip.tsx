import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";

interface IChipProps {
  label?: string;
  color?: string;
  small?: boolean;
  children?: ReactNode;
}

export default function Chip({ label, color, small, children }: IChipProps) {
  return (
    <span
      className={clsx("chip", styles.chip, {
        [styles[color]]: color,
        small: small,
      })}
    >
      {children || label}
    </span>
  );
}
