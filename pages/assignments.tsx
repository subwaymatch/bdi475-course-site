import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignments/AssignmentItem";
import CaseStudyItem from "components/pages/assignments/CaseStudyItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import { AuthCheck, useUser } from "reactfire";
import styles from "styles/pages/assignments.module.scss";
import Login from "components/Login";

export default function AssignmentsPage(props) {
  const { data: user } = useUser();

  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
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
                    No Exercises Posted <span className="accent purple" />
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}
