import { Row, Col } from "react-bootstrap";
import styles from "./AssignmentItem.module.scss";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import moment from "moment";
import clsx from "clsx";

type AssignmentItemProps = {
  name: string;
  dueDate: string;
  pointsAvailable: number;
  status: AssignmentStatus;
  colorTheme: ColorTheme;
};

export default function AssignmentItem({
  name,
  dueDate,
  pointsAvailable,
  status,
  colorTheme,
}: AssignmentItemProps) {
  return (
    <div
      className={clsx(styles.assignmentItem, {
        [styles.completed]: status === AssignmentStatus.Completed,
        [styles.available]: status === AssignmentStatus.Available,
        [styles.unavailable]: status === AssignmentStatus.Unavailable,
      })}
    >
      <Row>
        <Col md={4}>
          <span className={styles.name}>{name}</span>
        </Col>

        <Col md={6}>
          <div className={styles.statusLabels}>
            <span className="lightGrayLabel">
              Due {moment(dueDate, "YYYYMMDD").format("ll")}
            </span>
            <span className="grayLabel">
              {pointsAvailable} Points Available
            </span>
          </div>
        </Col>

        <Col md={2}>
          <span
            className={clsx({
              [colorTheme.toLowerCase()]: status == AssignmentStatus.Completed,
            })}
          >
            {status}
          </span>
        </Col>
      </Row>
    </div>
  );
}
