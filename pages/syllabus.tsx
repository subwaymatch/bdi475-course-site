import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import Syllabus from "components/Syllabus";
import styles from "styles/pages/syllabus.module.scss";

export default function SyllabusPage() {
  return (
    <Layout>
      <main className={styles.syllabusPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Syllabus</h1>
            </Col>
          </Row>
        </Container>

        <Syllabus />
      </main>
    </Layout>
  );
}
