import Link from "next/link";
import { Col } from "react-bootstrap";
import dayjs from "dayjs";
import styles from "./NoteItem.module.scss";
import { ColorTheme } from "typings/color-theme";
import clsx from "clsx";

interface NoteItemProps {
  href: string;
  thumbnail?: React.ReactNode;
  title: string;
  date: string;
  colorTheme?: ColorTheme;
}

export default function NoteItem({
  href,
  thumbnail,
  title,
  date,
  colorTheme = ColorTheme.Green,
}: NoteItemProps) {
  const day = dayjs(date);

  return (
    <Col lg={4} md={6}>
      <Link href={href}>
        <a className={styles.noteItem}>
          {thumbnail}

          <h3>{title}</h3>

          <div className={styles.dateWrapper}>
            <div className={styles.date}>
              <span>{day.format("YYYY")}</span>
              <div className={styles.dateDivider}>⁄</div>
              <span>{day.format("MM")}</span>
              <div className={styles.dateDivider}>⁄</div>
              <span>{day.format("DD")}</span>
            </div>

            <span
              className={clsx(
                styles.divider,
                `color-${colorTheme.toLowerCase()}`
              )}
            >
              •
            </span>

            <div className={styles.weekday}>{day.format("ddd")}</div>
          </div>
        </a>
      </Link>
    </Col>
  );
}
