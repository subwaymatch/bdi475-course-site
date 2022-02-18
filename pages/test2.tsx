import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import { useEffect, useRef } from "react";

export default function TestPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Markdown Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>Test</Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
