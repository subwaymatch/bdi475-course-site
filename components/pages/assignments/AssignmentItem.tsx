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
  console.log(`status=${status}`);
  console.log(`AssignmentStatus.Complete=${AssignmentStatus.Complete}`);

  return (
    <div
      className={clsx(
        styles.assignmentItem,
        {
          [styles.complete]: status === AssignmentStatus.Complete,
          [styles.available]: status === AssignmentStatus.Available,
          [styles.unavailable]: status === AssignmentStatus.Unavailable,
        },
        styles[colorTheme.toLowerCase()]
      )}
    >
      <Row>
        <Col md={4}>
          <span
            className={
              status === AssignmentStatus.Available
                ? colorTheme.toLowerCase()
                : styles.name
            }
          >
            {name}
          </span>
        </Col>

        <Col md={6}>
          <div className={styles.metaInfo}>
            <span
              className={clsx(
                status === AssignmentStatus.Available
                  ? colorTheme.toLowerCase() + "Label"
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

        <Col md={2}>
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
