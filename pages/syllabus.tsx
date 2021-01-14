import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/syllabus.module.scss";

export default function SyllabusPage() {
  return (
    <Layout>
      <Header />

      <main>
        <div className={styles.courseInformationSection}>
          <Container>
            <Row>
              <Col>
                <h1 className="pageTitle">
                  Introduction to Data Analytics Applications in Business
                </h1>
              </Col>
            </Row>

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
              <Col md={8}>
                <div className={styles.displayBox}>
                  <span className="pinkLabel">Class Time</span>
                  <span className={styles.text}>
                    Monday &amp; Wednesday 2:00-3:20PM
                  </span>
                </div>
              </Col>

              <Col md={4}>
                <div className={styles.displayBox}>
                  <span className="blueLabel">Zoom Link</span>
                  <span className={styles.text}>Join via Zoom ⟶</span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={styles.gradeBreakdownSection}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Grade Breakdown
                  <span className="purpleAccent" />
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Layout>
  );
}
