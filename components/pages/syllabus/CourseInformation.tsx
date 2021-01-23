import { Container, Row, Col } from "react-bootstrap";
import styles from "./CourseInformation.module.scss";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function CourseInformation() {
  return (
    <section className={styles.courseInformationSection}>
      <div className={styles.sectionInfo}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                Course Information
                <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label green">Term</span>
                <span className={styles.text}>Spring 2021</span>
              </div>
            </Col>

            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label purple">Credit</span>
                <span className={styles.text}>3 Hours</span>
              </div>
            </Col>

            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label yellow">Instructor</span>
                <span className={styles.text}>Park, Ye Joo</span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={8}>
              <div className={styles.displayBox}>
                <span className="label pink">Class Time</span>
                <span className={styles.text}>
                  Monday &amp; Wednesday 2:00-3:20PM
                </span>
              </div>
            </Col>

            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label blue">Email</span>
                <span className={styles.text}>ypark32@illinois.edu</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={styles.TAs}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                Teaching Assistant
                <span className="accent pink" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label yellow">Name</span>
                <span className={styles.text}>Yang, Li</span>
              </div>
            </Col>

            <Col sm={4}>
              <div className={styles.displayBox}>
                <span className="label blue">Email</span>
                <span className={styles.text}>liyang3@illinois.edu</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
