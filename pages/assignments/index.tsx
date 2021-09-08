import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignment/AssignmentItem";
import { AssignmentStatus } from "types/assignment";
import { ColorTheme } from "types/color-theme";
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
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
