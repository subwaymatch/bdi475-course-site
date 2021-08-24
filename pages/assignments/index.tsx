import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignment/AssignmentItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import { AuthCheck } from "reactfire";
import Login from "components/Auth/Login";
import styles from "styles/pages/assignments.module.scss";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Chicago");

export default function AssignmentsPage() {
  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Assignments</h1>
            </Col>
          </Row>
        </Container>

        <main className={styles.assignmentsPage}>
          <Container>
            <Row>
              <Col>
                <div className={styles.codingQuiz}>
                  <h2 className="sectionTitle">
                    Coding Quiz <span className="accent pink" />
                  </h2>
                  {/* 
                  <AssignmentItem
                    name="Quiz 1"
                    dueDate={dayjs("2021-02-11").tz().format("ll")}
                    pointsAvailable={25}
                    link="/assignments/quiz-01"
                    status={AssignmentStatus.Unavailable}
                    colorTheme={ColorTheme.Pink}
                  />

                  <AssignmentItem
                    name="Quiz 2"
                    dueDate={dayjs("2021-03-01").tz().format("ll")}
                    pointsAvailable={25}
                    link="/assignments/quiz-02-20210301"
                    status={AssignmentStatus.Unavailable}
                    colorTheme={ColorTheme.Pink}
                  />

                  <AssignmentItem
                    name="Quiz 4 - Working with Pandas"
                    dueDate={dayjs("2021-03-18").tz().format("ll")}
                    pointsAvailable={25}
                    link="https://bdi475-jupyter-notebooks.netlify.app/quiz-04-solution"
                    status={AssignmentStatus.Complete}
                    colorTheme={ColorTheme.Pink}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div
                  className={styles.codingQuiz}
                  style={{ marginTop: "40px" }}
                >
                  <h2 className="sectionTitle">
                    Problem Set
                    <span className="accent blue" />
                  </h2>

                  <AssignmentItem
                    name="Problem Set 1"
                    dueDate={dayjs("2021-03-01").tz().format("ll")}
                    pointsAvailable={80}
                    link="/assignments/problem-set-01"
                    status={AssignmentStatus.Unavailable}
                    colorTheme={ColorTheme.Blue}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div
                  className={styles.codingQuiz}
                  style={{ marginTop: "80px" }}
                >
                  <h2 className="sectionTitle">
                    Case Studies
                    <span className="accent green" />
                  </h2>

                  <AssignmentItem
                    name="Uber/Lyft Vehicles with Pandas"
                    dueDate={dayjs("2021-03-21").tz().format("ll")}
                    pointsAvailable={80}
                    link="https://bdi475-jupyter-notebooks.netlify.app/case-study-03-rideshare-vehicles-solution"
                    status={AssignmentStatus.Complete}
                    colorTheme={ColorTheme.Green}
                  />

                  <AssignmentItem
                    name="Uber/Lyft Trips with Plotly"
                    dueDate={dayjs("2021-04-20").tz().format("ll")}
                    pointsAvailable={80}
                    link="https://bdi475-jupyter-notebooks.netlify.app/case-study-05-rideshare-trips-solution"
                    status={AssignmentStatus.Complete}
                    colorTheme={ColorTheme.Green}
                  />

                  <AssignmentItem
                    name="Final Case Study"
                    dueDate={dayjs("2021-05-12").tz().format("ll")}
                    pointsAvailable={160}
                    link="https://www.notion.so/bdi475/Final-Case-Study-34c000e9f6ed4d21aa53943d06ea60bd"
                    status={AssignmentStatus.Available}
                    colorTheme={ColorTheme.Green}
                  /> */}
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}
