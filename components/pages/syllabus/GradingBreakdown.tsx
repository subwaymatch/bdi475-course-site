import { Container, Row, Col } from "react-bootstrap";
import styles from "./GradingBreakdown.module.scss";
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

export default function GradingBreakdown() {
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
              <span className="d-sm-none">Pts</span>
              <span className="d-none d-sm-inline">Points</span>
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
          item="Participation"
          points={100}
          percentage="10%"
          notes="Every class"
        />

        <GradedItem
          item="Exercises"
          points={240}
          percentage="24%"
          notes="24 @ 10 points each"
        />

        <GradedItem
          item="Quizzes"
          points={100}
          percentage="10%"
          notes="5 Quizzes → drop the lowest score"
        />

        <GradedItem
          item="Case Studies"
          points={560}
          percentage="56%"
          notes="7 Cases @ 80 points each"
        />

        <GradedItem
          item="Extra Credit"
          points={10}
          percentage="1%"
          notes="ARL Subject Pool"
        />
      </Container>
    </section>
  );
}
