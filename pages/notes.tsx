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
        </Container>
      </main>
    </Layout>
  );
}
