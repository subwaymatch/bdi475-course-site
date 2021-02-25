import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignment/AssignmentItem";
import CaseStudyItem from "components/pages/assignment/CaseStudyItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import { AuthCheck } from "reactfire";
import Login from "components/Login";
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

                  <AssignmentItem
                    name="Quiz 1"
                    dueDate={dayjs("2021-02-11").tz().format("ll")}
                    pointsAvailable={25}
                    link="/assignments/quiz-01"
                    status={AssignmentStatus.Unavailable}
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
                    Problem Sets
                    <span className="accent blue" />
                  </h2>

                  <AssignmentItem
                    name="Problem Set 1"
                    dueDate={dayjs("2021-03-01").tz().format("ll")}
                    pointsAvailable={25}
                    link="/assignments/problem-set-01"
                    status={AssignmentStatus.Available}
                    colorTheme={ColorTheme.Blue}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}
