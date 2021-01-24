import { Container, Row, Col } from "react-bootstrap";
import styles from "./GradingBreakdown.module.scss";
import clsx from "clsx";

const GradedItem = ({ item, points, percentage, notes }) => (
  <div className={styles.itemRow}>
    <Row>
      <Col sm={4} xs={6}>
        <div className={clsx(styles.cell, styles.componentName)}>{item}</div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.cell, styles.points)}>{points}</div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.cell, styles.percentage)}>{percentage}</div>
      </Col>

      <Col sm={4} xs={12}>
        <div className={clsx(styles.cell, styles.notes)}>{notes}</div>
      </Col>
    </Row>
  </div>
);

export default function GradingBreakdown() {
  return (
    <section className={styles.gradingBreakdownSection}>
      <Container>
        <Row>
          <Col>
            <h2 className="sectionTitle grayBottomBorder">
              Grading Breakdown
              <span className="accent purple" />
            </h2>
          </Col>
        </Row>

        <div className={styles.headerRow}>
          <Row>
            <Col sm={4} xs={6}>
              <div>
                <span className="label green">Item</span>
              </div>
            </Col>

            <Col sm={2} xs={3}>
              <div>
                <span className="d-sm-none label blue">Pts</span>
                <span className="d-none d-sm-inline label blue">Points</span>
              </div>
            </Col>

            <Col sm={2} xs={3}>
              <div>
                <span className="label purple">%</span>
              </div>
            </Col>

            <Col sm={4} className="d-none d-sm-block">
              <div>
                <span className="label yellow">Notes</span>
              </div>
            </Col>
          </Row>
        </div>

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
          notes="5 @ 2.5 points each (drop 1 lowest score)"
        />

        <GradedItem
          item="Case Studies"
          points={560}
          percentage="56%"
          notes="7 @ 80 points each"
        />

        <GradedItem
          item="Extra Credit"
          points={10}
          percentage="1%"
          notes="ARL Subject Pool"
        />

        <div className={styles.footerRow}>
          <Row>
            <Col sm={4} xs={6}>
              <div className={clsx(styles.cell, styles.componentName)}>
                Total <span className="accent green" />
              </div>
            </Col>

            <Col sm={2} xs={3}>
              <div className={clsx(styles.cell, styles.points)}>1000</div>
            </Col>

            <Col sm={2} xs={3}>
              <div className={clsx(styles.cell, styles.percentage)}>100%</div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
