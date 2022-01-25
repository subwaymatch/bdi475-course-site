import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import styles from "./AssignmentItem.module.scss";
import { AssignmentStatus } from "types/assignment";
import { ColorTheme } from "types/color-theme";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Chip from "components/common/Chip";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Chicago");

interface IAssignmentItemProps {
  name: string;
  dueDate: string;
  pointsAvailable: number;
  status: AssignmentStatus;
  link?: string;
  colorTheme: ColorTheme;
}

export default function AssignmentItem({
  name,
  dueDate,
  pointsAvailable,
  status,
  link,
  colorTheme,
}: IAssignmentItemProps) {
  return (
    <div
      className={clsx(
        styles.assignmentItem,
        {
          [styles.complete]: status === AssignmentStatus.Complete,
          [styles.available]: status === AssignmentStatus.Available,
          [styles.unavailable]: status === AssignmentStatus.Unavailable,
        },
        `color-${colorTheme.toLowerCase()}`
      )}
    >
      <Row>
        <Col md={{ span: 6, order: 2 }}>
          <div className={styles.metaInfo}>
            <Chip
              color={
                status === AssignmentStatus.Available
                  ? colorTheme.toLowerCase()
                  : "lightGray"
              }
            >
              Due {dueDate}
            </Chip>
            <Chip>{pointsAvailable} Points Available</Chip>
          </div>
        </Col>

        <Col md={{ span: 4, order: 1 }}>
          <Link href={link ? link : "/"}>
            <a className={clsx(styles.name)}>{name}</a>
          </Link>
        </Col>

        <Col md={{ span: 2, order: 3 }} sm={{ span: 12, order: 3 }}>
          <span
            className={clsx(styles.status, {
              [colorTheme.toLowerCase()]: status === AssignmentStatus.Available,
            })}
          >
            {status}
          </span>
        </Col>
      </Row>
    </div>
  );
}
