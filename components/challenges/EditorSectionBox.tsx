import _ from "lodash";
import styles from "./EditorSectionBox.module.scss";
import clsx from "clsx";
import { IconType } from "react-icons";
import { ColorTheme } from "types/color-theme";
import Tippy from "@tippyjs/react";

interface IIconButtonProps {
  Icon: IconType;
  tooltip?: React.ReactNode;
  disabled?: boolean;
  allowScroll?: boolean;
  onClick: () => void;
}

interface IEditorSectionBoxProps {
  title: React.ReactNode;
  colorTheme?: ColorTheme;
  iconButtons?: Array<IIconButtonProps>;
  allowScroll?: boolean;
  children: React.ReactNode;
}

export default function EditorSectionBox({
  title,
  colorTheme,
  iconButtons,
  allowScroll,
  children,
}: IEditorSectionBoxProps) {
  return (
    <div className={styles.sectionBox}>
      <div className={styles.boxHeader}>
        <div className={styles.boxTitle}>
          <span>{title}</span>
          {colorTheme && (
            <span className={clsx("accent", colorTheme.toLowerCase())} />
          )}
        </div>

        <div className={styles.boxControls}>
          {iconButtons &&
            iconButtons.map((o) => (
              <Tippy
                key={o.Icon.name}
                content={o.tooltip}
                className="tippy"
                placement="bottom"
                theme="light"
                disabled={!o.tooltip}
              >
                <span
                  className={clsx(styles.iconButton, {
                    [styles.disabled]: o.disabled,
                  })}
                  onClick={o.disabled ? () => {} : o.onClick}
                >
                  <o.Icon className={styles.reactIcon} />
                </span>
              </Tippy>
            ))}
        </div>
      </div>

      <div className={styles.sectionContentWrapper}>
        <div
          className={clsx(styles.sectionContent, {
            [styles.allowScroll]: allowScroll,
            [styles.preventOverflow]: !allowScroll,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
