import { Container, Row, Col } from "react-bootstrap";
import styles from "./GradingBreakdown.module.scss";
import clsx from "clsx";

interface IGradedItemProps {
  item: string;
  footnoteNumber?: number;
  points: number;
  percentage: number;
  notes: string;
}

const GradedItem = ({
  item,
  footnoteNumber,
  points,
  percentage,
  notes,
}: IGradedItemProps) => (
  <div className={styles.itemRow}>
    <Row>
      <Col sm={4} xs={6}>
        <div className={clsx(styles.cell, styles.componentName)}>
          <span className={styles.name}>{item}</span>
          {footnoteNumber && (
            <span className={styles.footnoteNumber}>{footnoteNumber}</span>
          )}
        </div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.cell, styles.points)}>{points}</div>
      </Col>

      <Col sm={2} xs={3}>
        <div className={clsx(styles.cell, styles.percentage)}>
          {percentage}%
        </div>
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
              <span className="accent green" />
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
                <span className="label gray">Notes</span>
              </div>
            </Col>
          </Row>
        </div>

        <GradedItem
          item="Participation"
          footnoteNumber={1}
          points={100}
          percentage={10}
          notes="Mostly in-class exercises"
        />

        <GradedItem
          item="Exercises"
          footnoteNumber={2}
          points={200}
          percentage={20}
          notes="10 @ 20 points each"
        />

        <GradedItem
          item="Quizzes"
          footnoteNumber={3}
          points={100}
          percentage={10}
          notes="5 @ 25 points each (drop 1 lowest score)"
        />

        <GradedItem
          item="Problem Set"
          footnoteNumber={4}
          points={60}
          percentage={6}
          notes="60 points"
        />

        <GradedItem
          item="Case Studies"
          footnoteNumber={5}
          points={400}
          percentage={40}
          notes="5 @ 80 points each"
        />

        <GradedItem
          item="Capstone Project"
          footnoteNumber={6}
          points={140}
          percentage={14}
          notes="Independent Final Project"
        />

        <GradedItem
          item="Extra Credit"
          points={10}
          percentage={1}
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
              <div className={clsx(styles.cell, styles.points)}>1010</div>
            </Col>

            <Col sm={2} xs={3}>
              <div className={clsx(styles.cell, styles.percentage)}>101%</div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
