import { Row, Col } from "react-bootstrap";
import styles from "./CaseStudyItem.module.scss";
import { AssignmentStatus } from "typings/assignment";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Chicago");

interface ICaseStudyItemProps {
  name: string;
  dueDate: string;
  pointsAvailable: number;
  status: AssignmentStatus;
  link?: string;
  thumbnail: React.ReactNode;
}

export default function CaseStudyItem({
  name,
  dueDate,
  pointsAvailable,
  status,
  link,
  thumbnail,
}: ICaseStudyItemProps) {
  return (
    <div
      className={clsx(styles.caseStudyItem, {
        [styles.complete]: status === AssignmentStatus.Complete,
        [styles.available]: status === AssignmentStatus.Available,
        [styles.unavailable]: status === AssignmentStatus.Unavailable,
      })}
    >
      <Row>
        <Col>{thumbnail}</Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className={styles.metaInfo}>
            <span
              className={clsx(
                "label",
                status === AssignmentStatus.Available ? "blue" : "lightGray"
              )}
            >
              Due {dueDate}
            </span>
            <span className="gray label">
              {pointsAvailable} Points Available
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <span className={styles.name}>{name}</span>
        </Col>
      </Row>

      <Row>
        <Col>
          <span
            className={clsx(styles.status, {
              blue: status === AssignmentStatus.Available,
            })}
          >
            {status}
          </span>
        </Col>
      </Row>
    </div>
  );
}
