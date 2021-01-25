import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/index.module.scss";

export default function MainPage() {
  return (
    <Layout>
      <main className={styles.mainPage}>
        <div className={styles.announcementsSection}>
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

            <Row>
              <Col>
                <div className={styles.item}>
                  <p>No announcement posted</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={styles.zoomLinkSection}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle">
                  Links <span className="blue accent" />
                </h2>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <div className={styles.displayBox}>
                  <span className="label yellow">Lecture</span>
                  <span className={styles.text}>
                    <a href="https://illinois.zoom.us/j/84904507698?pwd=QzZ2N3MrRTJDZjlXc0Z5NW8ycmtSZz09">
                      Zoom Link ⟶
                    </a>
                  </span>
                </div>
              </Col>
              <Col xs={6}>
                <div className={styles.displayBox}>
                  <span className="label blue">Discord</span>
                  <span className={styles.text}>
                    <a href="https://discord.gg/jWF56zsQ7E">
                      Discord Channel ⟶
                    </a>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Layout>
  );
}
