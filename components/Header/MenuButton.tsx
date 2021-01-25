import styles from "./MenuButton.module.scss";
import clsx from "clsx";

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
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
