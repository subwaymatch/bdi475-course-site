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
  link?: string;
  colorTheme: ColorTheme;
};

export default function AssignmentItem({
  name,
  dueDate,
  pointsAvailable,
  status,
  link,
  colorTheme,
}: AssignmentItemProps) {
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
        <Col md={{ span: 6, order: 2 }}>
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

        <Col md={{ span: 4, order: 1 }}>
          <span
            className={clsx(styles.name, {
              [colorTheme.toLowerCase()]: status === AssignmentStatus.Available,
            })}
          >
            {name}
          </span>
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
