import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/index.module.scss";

export default function MainPage() {
  return (
    <Layout>
      <main className={styles.mainPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">
                Introduction to Data Analytics Applications in Business
              </h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="sectionTitle">
                Announcements <span className="greenAccent" />
              </h2>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
