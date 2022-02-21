import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";

export default function TestPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Test Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>Test Content</p>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
