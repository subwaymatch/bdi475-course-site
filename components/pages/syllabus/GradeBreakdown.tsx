import { Container, Row, Col } from "react-bootstrap";
import styles from "./GradeBreakdown.module.scss";
import clsx from "clsx";

const GradedItem = ({ item, points, percentage, notes }) => (
  <div className={styles.gradedItem}>
    <Row>
      <Col sm={4} xs={6}>
        <span className={clsx(styles.columnCell)}>{item}</span>
      </Col>

      <Col sm={2} xs={3}>
        <span className={clsx(styles.columnCell)}>{points}</span>
      </Col>

      <Col sm={2} xs={3}>
        <span className={clsx(styles.columnCell, styles.purple)}>
          {percentage}
        </span>
      </Col>

      <Col sm={4} xs={12}>
        <span className={clsx(styles.columnCell, styles.note)}>{notes}</span>
      </Col>
    </Row>
  </div>
);

export default function GradeBreakdown() {
  return (
    <section className={styles.gradeBreakdownSection}>
      <Container>
        <Row>
          <Col>
            <h2 className="sectionTitle blackBottomBorder">
              Grade Breakdown
              <span className="purpleAccent" />
            </h2>
          </Col>
        </Row>

        <Row className={styles.headerRow}>
          <Col sm={4} xs={6}>
            <span className={clsx(styles.columnCell, styles.columnHeader)}>
              Item
            </span>
          </Col>

          <Col sm={2} xs={3}>
            <span className={clsx(styles.columnCell, styles.columnHeader)}>
              Points
            </span>
          </Col>

          <Col sm={2} xs={3}>
            <span
              className={clsx(
                styles.columnCell,
                styles.columnHeader,
                styles.purple
              )}
            >
              Percentage
            </span>
          </Col>

          <Col sm={4} className="d-none d-sm-block">
            <span className={clsx(styles.columnCell, styles.columnHeader)}>
              Notes
            </span>
          </Col>
        </Row>

        <GradedItem
          item="In-class Exercise"
          points={200}
          percentage={0.2}
          notes="Every class"
        />

        <GradedItem
          item="After-class Exercise"
          points={100}
          percentage={0.1}
          notes="20 Exercises"
        />
      </Container>
    </section>
  );
}
