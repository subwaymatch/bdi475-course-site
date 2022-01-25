import { Container, Row, Col } from "react-bootstrap";
import styles from "./CourseInformation.module.scss";
import clsx from "clsx";
import Image from "next/image";
import GradingBreakdown from "./GradingBreakdown";
import GradingDetails from "./GradingDetails";
import PoliciesAndDisclosures from "./PoliciesAndDisclosures";
import Chip from "components/common/Chip";

export default function CourseInformation() {
  return (
    <section className={styles.courseInformation}>
      <div className={styles.sectionInfo}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                Course Information
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className={styles.displayBox}>
                <Chip color="purple">Course Number</Chip>
                <span className={styles.largeText}>BDI 475</span>
              </div>
            </Col>

            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label orange">Credit</span>
                <span className={styles.largeText}>3 Hours</span>
              </div>
            </Col>

            <Col md={4}>
              <div className={styles.displayBox}>
                <Chip color="blue">Instructor</Chip>
                <span className={styles.largeText}>Park, Ye Joo</span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className={styles.displayBox}>
                <span className="label gray">Term</span>
                <span className={styles.largeText}>Spring 2022</span>
              </div>
            </Col>

            <Col md={8}>
              <div className={styles.displayBox}>
                <Chip color="green">Class Time &amp; Location</Chip>
                <div className={styles.largeText}>
                  Tues &amp; Thurs 12:30-1:50 PM
                  <br />
                  <span className="color-gray">226 Wohlers Hall</span>
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
                Instructional Team
                <span className="accent orange" />
              </h2>
            </Col>
          </Row>

          <div className={styles.memberInfo}>
            <Row>
              <Col
                lg={{
                  span: 8,
                  order: 1,
                }}
                xs={{
                  span: 12,
                  order: 2,
                }}
              >
                <div className={styles.memberHeader}>
                  <span className={styles.role}>Course Instructor</span>
                  <span className={styles.name}>Ye Joo Park</span>
                  <span className={styles.title}>
                    Instructor of Accountancy
                  </span>
                  <span className={styles.title}>
                    Associate Director, UI-Deloitte Center for Business
                    Analytics
                  </span>
                </div>

                <div className={styles.memberDesc}>
                  <p className={styles.text}>
                    Greetings! Please call me <code>Park</code>. I started
                    programming as a hobby in elementary school. During my final
                    year as an accounting major here, I've made up my mind to
                    pursue what I love to do! Fast-forward to 2021, I'm excited
                    to be back at my alma mater to be a part of a leading-edge
                    data analytics curriculum.
                  </p>
                </div>
              </Col>

              <Col
                lg={{
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

                  <div className={styles.imageLabel}>
                    <span className="label black">Park</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles.memberInfo}>
            <Row>
              <Col
                lg={{
                  span: 8,
                  order: 1,
                }}
                xs={{
                  span: 12,
                  order: 2,
                }}
              >
                <div className={styles.memberHeader}>
                  <span className={styles.role}>Teaching Assistant</span>
                  <span className={styles.name}>Sandip Sonawane</span>
                  <span className={styles.title}>
                    MS Statistics with Analytics Concentration
                  </span>
                </div>

                <div className={styles.memberDesc}>
                  <p className={styles.text}>
                    I am pursuing a Master's Degree in Statistics-Analytics at
                    UIUC. In my previous role at Eaton Research Labs, I had an
                    extensive range of responsibilities including selecting
                    features, mining data, improving data collection techniques,
                    processing data, optimizing classifiers, and doing ad-hoc
                    analyses. As a Data Scientist, I was required to have
                    excellent communication skills, understanding of algorithms,
                    excellence in Python, proficiency in Pandas & SQL, and
                    excellent knowledge of applied statistics.
                  </p>
                </div>
              </Col>

              <Col
                lg={{
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
                    src="/images/sandip_square_bw.jpg"
                    width={1000}
                    height={1000}
                  />

                  <div className={styles.imageLabel}>
                    <span className="label black">Sandip</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <GradingBreakdown />

      <GradingDetails />

      <PoliciesAndDisclosures />
    </section>
  );
}
