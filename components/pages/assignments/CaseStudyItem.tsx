import { Row, Col } from "react-bootstrap";
import styles from "./CaseStudyItem.module.scss";
import { AssignmentStatus } from "typings/assignment";
import moment from "moment";
import clsx from "clsx";

type CaseStudyItemProps = {
  name: string;
  dueDate: string;
  pointsAvailable: number;
  status: AssignmentStatus;
  thumbnail: React.ReactNode;
};

export default function CaseStudyItem({
  name,
  dueDate,
  pointsAvailable,
  status,
  thumbnail,
}: CaseStudyItemProps) {
  console.log(`status=${status}`);
  console.log(`AssignmentStatus.Complete=${AssignmentStatus.Complete}`);

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
                status === AssignmentStatus.Available
                  ? "blueLabel"
                  : "lightGrayLabel"
              )}
            >
              Due {moment(dueDate, "YYYYMMDD").format("ll")}
            </span>
            <span className="grayLabel">
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
