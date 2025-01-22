import { Container, Row, Col } from "react-bootstrap";
import styles from "./CourseInformation.module.scss";
import clsx from "clsx";
import Image from "next/image";
import GradingBreakdown from "./GradingBreakdown";
import GradingDetails from "./GradingDetails";
import PoliciesAndDisclosures from "./PoliciesAndDisclosures";
import Chip from "components/common/Chip";
import Link from "next/link";

export default function CourseInformation() {
  return (
    <section className={styles.courseInformation}>
      <div className={styles.sectionInfo}>
        <Container fluid>
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
                <Chip color="orange">Credit</Chip>
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
                <Chip>Term</Chip>
                <span className={styles.largeText}>Spring 2025</span>
              </div>
            </Col>

            <Col md={8}>
              <div className={styles.displayBox}>
                <Chip color="green">Class Time &amp; Location</Chip>
                <div className={styles.largeText}>
                  Section DAA: Tues &amp; Thurs 12:30-1:50 PM{" "}
                  <span className="color-gray">@ 226 Wohlers</span>
                  {/* <br />
                  Section B: Tues &amp; Thurs 2:00-3:20 PM{" "}
                  <span className="color-gray">@ 3041 BIF</span>
                  <br />
                  Section A: Tues &amp; Thurs 3:30-4:50 PM{" "}
                  <span className="color-gray">@ 3007 BIF</span> */}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className={styles.displayBox}>
                <h3>Office Hours</h3>
              </div>
            </Col>

            <Col md={8}>
              <div className={styles.displayBox}>
                <div className={styles.largeText}>
                  <span className="color-green">Park</span>
                  <br />
                  Thursdays 6:00-7:00 PM
                </div>
              </div>

              {/* <div className={styles.displayBox}>
                <div className={styles.largeText}>
                  <span className="color-green">Se-ya Kim</span>
                  <br />
                  TBD
                </div>
              </div> */}

              <div className={styles.displayBox}>
                <div className={styles.largeText}>
                  {" "}
                  <Link href="https://illinois.zoom.us/j/88199992344?pwd=dTMvdnM3SHF4eE11NnBjZGJ6NGhMZz09">
                    🖥️ Office Hours Zoom Link ⟶
                  </Link>
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
        <Container fluid>
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
                    Associate Academic Director, UI-Deloitte Center for Business
                    Analytics
                  </span>
                </div>

                <div className={styles.memberDesc}>
                  <p className={styles.text}>
                    Greetings! Please call me <code>Park</code>. I started
                    programming as a hobby in elementary school. During my final
                    year as an accounting major here, I've made up my mind to
                    pursue what I love to do! Fast-forward to 2025, I'm excited
                    to be back at my alma mater to be a part of a leading-edge
                    data analytics curriculum. My email is{" "}
                    <a href="mailto:ypark32@illinois.edu">
                      ypark32@illinois.edu
                    </a>{" "}
                    in case you need to reach me.
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
                    <Chip color="black">Park</Chip>
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
                  <span className={styles.name}>Se-ya Kim</span>
                  <span className={styles.title}>
                    Master of Accounting Science
                  </span>
                </div>

                <div className={styles.memberDesc}>
                  <p className={styles.text}>
                    Hi everyone! My name is Se-Ya Kim, and I am a master's
                    student in Accountancy at the Gies College of Business,
                    specializing in financial reporting, assurance, and data
                    analytics. I've also completed my undergraduate degree in
                    Accountancy at the University of Illinois. Throughout my
                    time at the U of I, I've had the opportunity to explore the
                    integration of data analytics into accounting practices
                    through various coursework and involvement in RSOs. I
                    believe that data analytics is a powerful tool that fuels
                    both our personal curiosity and professional growth. I'm
                    looking forward to supporting you in BDI 475! My email is{" "}
                    <a href="mailto:seyakim2@illinois.edu">
                      seyakim2@illinois.edu
                    </a>
                    .
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
                    src="/images/seya_square_bw.jpg"
                    width={1000}
                    height={1000}
                  />

                  <div className={styles.imageLabel}>
                    <Chip color="black">Se-Ya</Chip>
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
