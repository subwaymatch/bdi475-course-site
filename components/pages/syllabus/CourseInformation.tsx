import { Container, Row, Col } from "react-bootstrap";
import styles from "./CourseInformation.module.scss";

export default function CourseInformation() {
  return (
    <section className={styles.courseInformationSection}>
      <Container>
        <Row>
          <Col>
            <h2 className="sectionTitle">
              Course Information
              <span className="greenAccent" />
            </h2>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <div className={styles.displayBox}>
              <span className="greenLabel">Term</span>
              <span className={styles.text}>Spring 2021</span>
            </div>
          </Col>

          <Col sm={4}>
            <div className={styles.displayBox}>
              <span className="purpleLabel">Credit</span>
              <span className={styles.text}>3 Hours</span>
            </div>
          </Col>

          <Col sm={4}>
            <div className={styles.displayBox}>
              <span className="yellowLabel">Instructor</span>
              <span className={styles.text}>Park, Ye Joo</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <div className={styles.displayBox}>
              <span className="pinkLabel">Class Time</span>
              <span className={styles.text}>
                Monday &amp; Wednesday 2:00-3:20PM
              </span>
            </div>
          </Col>

          <Col sm={4}>
            <div className={styles.displayBox}>
              <span className="blueLabel">Email</span>
              <span className={styles.text}>ypark32@illinois.edu</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
