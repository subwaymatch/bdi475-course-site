import { Container, Row, Col } from "react-bootstrap";
import styles from "./GradeBreakdown.module.scss";
import clsx from "clsx";

const GradedItem = ({ item, points, percentage, notes }) => (
  <div className={styles.itemRow}>
    <Row>
      <Col sm={4} xs={6}>
        <div className={clsx(styles.columnCell)}>{item}</div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.columnCell)}>{points}</div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.columnCell, styles.purple)}>
          {percentage}
        </div>
      </Col>

      <Col sm={4} xs={12}>
        <div className={clsx(styles.columnCell, styles.note)}>{notes}</div>
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
            <div className={clsx(styles.columnCell, styles.columnHeader)}>
              Item
            </div>
          </Col>

          <Col sm={2} xs={3}>
            <div className={clsx(styles.columnCell, styles.columnHeader)}>
              Points
            </div>
          </Col>

          <Col sm={2} xs={3}>
            <div
              className={clsx(
                styles.columnCell,
                styles.columnHeader,
                styles.purple
              )}
            >
              <span className="d-sm-none">%</span>
              <span className="d-none d-sm-inline">Percentage</span>
            </div>
          </Col>

          <Col sm={4} className="d-none d-sm-block">
            <div className={clsx(styles.columnCell, styles.columnHeader)}>
              Notes
            </div>
          </Col>
        </Row>

        <GradedItem
          item="In-class Exercise"
          points={200}
          percentage="20%"
          notes="Every class"
        />

        <GradedItem
          item="After-class Exercise"
          points={100}
          percentage="10%"
          notes="20 Exercises"
        />

        <GradedItem
          item="Case Studies"
          points={320}
          percentage="32%"
          notes="8 Cases"
        />

        <GradedItem
          item="Extra Credit"
          points={10}
          percentage="1%"
          notes="Accountancy Research Lab"
        />
      </Container>
    </section>
  );
}
