import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignment/AssignmentItem";
import { AssignmentStatus } from "types/assignment";
import { ColorTheme } from "types/color-theme";
import styles from "styles/pages/assignments.module.scss";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CaseStudyItem from "components/pages/assignment/CaseStudyItem";
import Image from "next/image";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Chicago");

export default function AssignmentsPage() {
  return (
    <Layout>
      <main className={styles.assignmentsPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Assignments</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.exercises}>
                <h2 className="sectionTitle">
                  Exercises <span className="accent purple" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate={dayjs("2022-01-27").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-01"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2022-02-09").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-02"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2022-02-09").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-03"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2022-02-11").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-04"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 5"
                  dueDate={dayjs("2022-02-19").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/432479"
                  colorTheme={ColorTheme.Purple}
                />
                <AssignmentItem
                  name="Exercise 6"
                  dueDate={dayjs("2022-03-02").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/436926"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 7"
                  dueDate={dayjs("2022-03-27").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/443935"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 8"
                  dueDate={dayjs("2022-04-08").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/14860/assignments/342468"
                  colorTheme={ColorTheme.Purple}
                />

                {/*
                <AssignmentItem
                  name="Exercise 9"
                  dueDate={dayjs("2021-11-05").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/343676"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 10"
                  dueDate={dayjs("2021-11-17").tz().format("ll")}
                  pointsAvailable={80}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/346038"
                  colorTheme={ColorTheme.Purple}
                /> */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.problemSets}>
                <h2 className="sectionTitle">
                  Problem Sets <span className="accent blue" />
                </h2>

                <AssignmentItem
                  name="Problem Set 1"
                  dueDate={dayjs("2022-02-14").tz().format("ll")}
                  pointsAvailable={60}
                  status={AssignmentStatus.Available}
                  link="/assignments/problem-set-01"
                  colorTheme={ColorTheme.Blue}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.codingQuizzes}>
                <h2 className="sectionTitle">
                  Coding Quizzes <span className="accent green" />
                </h2>

                <AssignmentItem
                  name="Quiz 1"
                  dueDate={dayjs("2022-02-03").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Unavailable}
                  link="/assignments/quiz-01"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 2 Prep"
                  dueDate={dayjs("2022-02-22").tz().format("ll")}
                  pointsAvailable={0}
                  status={AssignmentStatus.Unavailable}
                  link="/assignments/quiz-02-prep"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 2"
                  dueDate={dayjs("2022-02-22").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/434590"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 3"
                  dueDate={dayjs("2022-03-04").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/436916"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 4"
                  dueDate={dayjs("2022-03-29").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Unavailable}
                  link="https://canvas.illinois.edu/courses/18332/assignments/443939"
                  colorTheme={ColorTheme.Green}
                />

                {/*
                <AssignmentItem
                  name="Quiz 5"
                  dueDate={dayjs("2021-11-25").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/346164/edit"
                  colorTheme={ColorTheme.Green}
                /> */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.caseStudies}>
                <h2 className="sectionTitle">
                  Case Studies <span className="accent blue" />
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <CaseStudyItem
                name="Chicago Ridesharing Vehicles"
                dueDate={dayjs("2022-03-01").tz().format("ll")}
                pointsAvailable={80}
                status={AssignmentStatus.Unavailable}
                link="https://canvas.illinois.edu/courses/18332/assignments/435420"
                thumbnail={
                  <Image
                    src="/images/case-studies/case_study_ridesharing_vehicles.jpg"
                    layout="responsive"
                    width={1920}
                    height={640}
                  />
                }
              />
            </Col>

            <Col lg={6}>
              <CaseStudyItem
                name="Starbucks App Customers"
                dueDate={dayjs("2022-03-12").tz().format("ll")}
                pointsAvailable={80}
                status={AssignmentStatus.Unavailable}
                link="https://canvas.illinois.edu/courses/18332/assignments/438367"
                thumbnail={
                  <Image
                    src="/images/case-studies/case_study_starbucks_app_customers.jpg"
                    layout="responsive"
                    width={1920}
                    height={640}
                  />
                }
              />
            </Col>

            <Col lg={6}>
              <CaseStudyItem
                name="Airbnb Listings Analysis with SQL"
                dueDate={dayjs("2022-04-01").tz().format("ll")}
                pointsAvailable={80}
                status={AssignmentStatus.Unavailable}
                link="https://canvas.illinois.edu/courses/18332/assignments/443931"
                thumbnail={
                  <Image
                    src="/images/case-studies/case_study_airbnb_listings.jpg"
                    layout="responsive"
                    width={1920}
                    height={640}
                  />
                }
              />
            </Col>

            {/*
            <Col lg={6}>
              <CaseStudyItem
                name="Chicago Ridesharing Trips Before & After COVID-19"
                dueDate={dayjs("2021-11-30").tz().format("ll")}
                pointsAvailable={80}
                status={AssignmentStatus.Available}
                link="https://canvas.illinois.edu/courses/14860/assignments/346161"
                thumbnail={
                  <Image
                    src="/images/case-studies/case_study_ridesharing_trips.jpg"
                    layout="responsive"
                    width={1920}
                    height={640}
                  />
                }
              />
            </Col>

            <Col lg={6}>
              <CaseStudyItem
                name="Fortune 1000 Tableau Visualizations"
                dueDate={dayjs("2021-12-01").tz().format("ll")}
                pointsAvailable={80}
                status={AssignmentStatus.Available}
                link="https://canvas.illinois.edu/courses/14860/assignments/346162"
                thumbnail={
                  <Image
                    src="/images/case-studies/case_study_fortune_1000.jpg"
                    layout="responsive"
                    width={1920}
                    height={640}
                  />
                }
              />
            </Col> */}
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
