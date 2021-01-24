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
                Announcements <span className="green accent" />
              </h2>
            </Col>
          </Row>
        </Container>

        <div className={styles.zoomLinkSection}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Join Lecture <span className="blue accent" />
                </h2>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <span className="label yellow">Lecture</span>
                <a href="https://github.com">Zoom Link ⟶</a>
              </Col>
              <Col xs={6}>
                <span className="label pink">Discussions</span>
                <a href="https://github.com">Discord ⟶</a>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Layout>
  );
}
