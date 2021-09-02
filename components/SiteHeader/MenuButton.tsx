import styles from "./MenuButton.module.scss";
import clsx from "clsx";

interface IMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen, onClick }: IMenuButtonProps) {
  return (
    <div
      className={clsx(styles.menuBtn, {
        [styles.open]: isOpen,
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className={styles.menuIcon} />
    </div>
  );
}
