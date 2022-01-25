import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "./CaseStudyItem.module.scss";
import { AssignmentStatus } from "types/assignment";
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
    <Link href={link ? link : "/"}>
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
              <Chip
                color={
                  status === AssignmentStatus.Available ? "blue" : "lightGray"
                }
              >
                Due {dueDate}
              </Chip>
              <Chip>{pointsAvailable} Points Available</Chip>
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
                "color-blue": status === AssignmentStatus.Available,
              })}
            >
              {status}
            </span>
          </Col>
        </Row>
      </div>
    </Link>
  );
}
