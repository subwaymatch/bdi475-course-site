import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { AuthCheck } from "reactfire";
import styles from "styles/pages/assignments.module.scss";
import Login from "components/Auth/Login";

export default function AssignmentsPage(props) {
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
