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
                  dueDate={dayjs("2021-09-07").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-01"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2021-09-09").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-02"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2021-09-14").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-03"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2021-09-23").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="/assignments/exercise-04"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 5"
                  dueDate={dayjs("2021-10-03").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/330304"
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 6"
                  dueDate={dayjs("2021-10-06").tz().format("ll")}
                  pointsAvailable={20}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/332380"
                  colorTheme={ColorTheme.Purple}
                />
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
                  dueDate={dayjs("2021-09-21").tz().format("ll")}
                  pointsAvailable={80}
                  status={AssignmentStatus.Available}
                  link="/assignments/problem-set-01"
                  colorTheme={ColorTheme.Blue}
                />

                <AssignmentItem
                  name="Problem Set 2"
                  dueDate={dayjs("2021-10-14").tz().format("ll")}
                  pointsAvailable={80}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/333593"
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
                  dueDate={dayjs("2021-09-13").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Available}
                  link="/assignments/quiz-01"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 2"
                  dueDate={dayjs("2021-09-24").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Available}
                  link="/assignments/quiz-02"
                  colorTheme={ColorTheme.Green}
                />

                <AssignmentItem
                  name="Quiz 3"
                  dueDate={dayjs("2021-10-08").tz().format("ll")}
                  pointsAvailable={25}
                  status={AssignmentStatus.Available}
                  link="https://canvas.illinois.edu/courses/14860/assignments/332255"
                  colorTheme={ColorTheme.Green}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
