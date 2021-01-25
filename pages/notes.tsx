import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes.module.scss";

export default function NotesPage() {
  return (
    <Layout>
      <main className={styles.notesPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Lecture Notes</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="sectionTitle">
                No lecture notes posted <span className="blue accent" />
              </h2>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
