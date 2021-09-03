import { Container, Row, Col } from "react-bootstrap";
import styles from "./Syllabus.module.scss";
import clsx from "clsx";
import Image from "next/image";
import GradingBreakdown from "./GradingBreakdown";
import GradingDetails from "./GradingDetails";

export default function CourseInformation() {
  return (
    <section className={styles.syllabus}>
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
            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label orange">Course Number</span>
                <span className={styles.largeText}>BDI 475</span>
              </div>
            </Col>

            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label blue">Credit</span>
                <span className={styles.largeText}>3 Hours</span>
              </div>
            </Col>

            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label purple">Instructor</span>
                <span className={styles.largeText}>Park, Ye Joo</span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label yellow">Term</span>
                <span className={styles.largeText}>Fall 2021</span>
              </div>
            </Col>

            <Col md={8}>
              <div className={styles.displayBox}>
                <span className="label green">Class Time &amp; Location</span>
                <div className={styles.largeText}>
                  Tues &amp; Thurs 3:30-4:50 PM
                  <br />
                  <span className="color-gray">
                    3007 Business Instructional Facility
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={clsx(styles.displayBox, styles.about)}>
                <Row>
                  <Col md={4}>
                    <h3>About the Course</h3>
                  </Col>

                  <Col md={8}>
                    <p className={styles.text}>
                      You will work with the fundamental tools of data analysis
                      including the Python programming language, SQL, and
                      Tableau. The goals of this course are to become
                      comfortable working with data, communicate insights, and{" "}
                      <span className="color-green">
                        make better business decisions.
                      </span>
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={styles.instructionalTeam}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                Instructor
                <span className="accent orange" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col
              md={{
                span: 8,
                order: 1,
              }}
              xs={{
                span: 12,
                order: 2,
              }}
            >
              <div className={styles.memberHeader}>
                <Row>
                  <Col lg={6} md={12}>
                    <span className={styles.name}>Ye Joo Park</span>
                    <span className={styles.role}>Course Instructor</span>
                  </Col>
                  <Col lg={6} md={12}>
                    <span className={styles.title}>
                      Instructor of Accountancy
                    </span>
                    <span className={styles.title}>
                      UI-Deloitte Center Fellow
                    </span>
                  </Col>
                </Row>
              </div>

              <div className={styles.memberDesc}>
                <p className={styles.text}>
                  Greetings! Please call me <code>"Park"</code>. I started
                  programming as a hobby in elementary school. During my final
                  year as an accounting major here, I've made up my mind to
                  pursue what I love to do! Fast-forward to 2021, I'm excited to
                  be back at my alma mater to be a part of a leading-edge data
                  analytics curriculum.
                </p>
              </div>
            </Col>

            <Col
              md={{
                span: 4,
                order: 2,
              }}
              xs={{
                span: 12,
                order: 1,
              }}
            >
              <div className={styles.memberImage}>
                <Image
                  src="/images/park_square_bw.jpg"
                  width={1000}
                  height={1000}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <GradingBreakdown />

      <GradingDetails />
    </section>
  );
}
