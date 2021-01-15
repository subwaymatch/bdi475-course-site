import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignments/AssignmentItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";

export default function AssignmentsPage() {
  return (
    <Layout>
      <Header />

      <Container>
        <Row>
          <Col>
            <h1 className="pageTitle">Assignments</h1>
          </Col>
        </Row>
      </Container>

      <main>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle">
                After-class Exercises <span className="purpleAccent" />
              </h2>

              <AssignmentItem
                name="Exercise 1"
                dueDate="20210126"
                pointsAvailable={8}
                status={AssignmentStatus.Completed}
                colorTheme={ColorTheme.Purple}
              />

              <AssignmentItem
                name="Exercise 2"
                dueDate="20210131"
                pointsAvailable={8}
                status={AssignmentStatus.Completed}
                colorTheme={ColorTheme.Purple}
              />

              <AssignmentItem
                name="Exercise 3"
                dueDate="20210204"
                pointsAvailable={8}
                status={AssignmentStatus.Available}
                colorTheme={ColorTheme.Purple}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
