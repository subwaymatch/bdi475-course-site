import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignments/AssignmentItem";
import CaseStudyItem from "components/pages/assignments/CaseStudyItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import styles from "styles/pages/assignments.module.scss";

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
                  After-class Exercises <span className="purpleAccent" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate="20210126"
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate="20210131"
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate="20210204"
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate="20210215"
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
                  Coding Quiz <span className="pinkAccent" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate="20210126"
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate="20210131"
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate="20210204"
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate="20210215"
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
                  Case Study <span className="blueAccent" />
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CaseStudyItem
                name="Uber Supply and Demand"
                dueDate="20210131"
                pointsAvailable={8}
                status={AssignmentStatus.Complete}
                thumbnail={<img src="/images/placeholder_plates.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="AirBnB Analysis"
                dueDate="20210204"
                pointsAvailable={8}
                status={AssignmentStatus.Available}
                thumbnail={<img src="/images/placeholder_lemon.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="DuPont Case"
                dueDate="20210215"
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
