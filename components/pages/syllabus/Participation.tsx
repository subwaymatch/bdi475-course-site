import { Container, Row, Col } from "react-bootstrap";
import styles from "./Participation.module.scss";

export default function Participation() {
  return (
    <section className={styles.participation}>
      <Container>
        <Row>
          <Col md={6}>
            <h2 className="sectionTitle grayBottomBorder">
              Attendance <span className="orangeAccent" />
            </h2>

            <p>
              The cost of skipping is very high in this course. If you skip
              class, you are likely to fall behind for the entire semester (even
              worse, throughout subsequent Data Analytics courses in future
              semesters). To incentivize to attend class, I will reflect your
              attendance towards the participation points. Up to 2 absences are
              allowed without a prior approval (no points will be deducted for
              the first 2 absences). For any special occasions, please email me
              in advance.
            </p>
          </Col>

          <Col md={6}>
            <h2 className="sectionTitle grayBottomBorder">
              Participation
              <span className="pinkAccent" />
            </h2>

            <p>
              Speaking up in class is not easy. It was not easy for me either.
              However, expressing your ideas to others is a critical skill in
              business. I encourage you to overcome your fears and participate
              in class. Your participation grades are based on two criteria – 1)
              <strong>participation in in-class exercises</strong> and 2)
              <strong>participation in discussions</strong>. Your participation
              grades are purely subjective. Over the course of the semester, I
              will observe who speaks up in classes, who helps their classmates,
              and who puts in efforts on in-class exercises. I will reward the
              quality, not quantity of participation.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
