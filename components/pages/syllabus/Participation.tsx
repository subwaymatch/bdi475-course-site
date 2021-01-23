import { Container, Row, Col } from "react-bootstrap";
import styles from "./Participation.module.scss";

export default function Participation() {
  return (
    <section className={styles.participation}>
      <Container>
        <Row>
          <Col>
            <h2 className="sectionTitle grayBottomBorder">
              Attendance &amp; Participation <span className="orange accent" />
            </h2>
          </Col>
        </Row>

        <div className={styles.attendance}>
          <Row>
            <Col md={2}>
              <span className="green label">Attendance</span>
            </Col>
            <Col md={10}>
              <p>
                The cost of skipping is very high in this course. If you skip
                class, you are likely to fall behind for the entire semester
                (even worse, throughout subsequent Data Analytics courses in
                future semesters). To incentivize to attend class, I will
                reflect your attendance towards the participation points. Up to
                2 absences are allowed without a prior approval (no points will
                be deducted for the first 2 absences). For any special
                occasions, please email me in advance.
              </p>
            </Col>
          </Row>
        </div>
        <div className={styles.attendance}>
          <Row>
            <Col md={2}>
              <span className="purple label">Participation</span>
            </Col>
            <Col md={10}>
              <p>
                Your participation grades are based on two criteria – 1){" "}
                <strong>participation in in-class exercises</strong> and 2)
                <strong>participation in discussions</strong>.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
