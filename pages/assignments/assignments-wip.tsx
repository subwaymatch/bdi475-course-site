import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignment/AssignmentItem";
import CaseStudyItem from "components/pages/assignment/CaseStudyItem";
import { AuthCheck } from "reactfire";
import Login from "components/Auth/Login";
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
              <div className={styles.exercises}>
                <h2 className="sectionTitle">
                  Exercises <span className="accent purple" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate={dayjs("2021-01-26").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2021-01-31").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2021-02-04").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2021-02-15").tz().format("ll")}
                  pointsAvailable={10}
                  status={AssignmentStatus.Unavailable}
                  colorTheme={ColorTheme.Purple}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.codingQuiz}>
                <h2 className="sectionTitle">
                  Coding Quiz <span className="accent pink" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate={dayjs("2021-01-26").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2021-01-31").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2021-02-04").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2021-02-15").tz().format("ll")}
                  pointsAvailable={10}
                  status={AssignmentStatus.Unavailable}
                  colorTheme={ColorTheme.Pink}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.caseStudies}>
                <h2 className="sectionTitle">
                  Case Study <span className="accent blue" />
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CaseStudyItem
                name="Uber Supply and Demand"
                dueDate={dayjs("2021-01-31").tz().format("ll")}
                pointsAvailable={8}
                status={AssignmentStatus.Complete}
                thumbnail={<img src="/images/placeholder_plates.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="AirBnB Analysis"
                dueDate={dayjs("2021-02-04").tz().format("ll")}
                pointsAvailable={8}
                status={AssignmentStatus.Available}
                thumbnail={<img src="/images/placeholder_lemon.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="DuPont Case"
                dueDate={dayjs("2021-02-15").tz().format("ll")}
                pointsAvailable={10}
                status={AssignmentStatus.Unavailable}
                thumbnail={<img src="/images/placeholder_grapefruits.jpg" />}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
