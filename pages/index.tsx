import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
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
              <Col md={4}>
                <div className={styles.displayBox}>
                  <span className="label yellow">
                    Lecture &amp; Office Hours
                  </span>
                  <motion.div
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.text}
                  >
                    <a href="https://illinois.zoom.us/j/84904507698?pwd=QzZ2N3MrRTJDZjlXc0Z5NW8ycmtSZz09">
                      Zoom Link ⟶
                    </a>
                  </motion.div>
                </div>
              </Col>

              <Col md={4}>
                <div className={styles.displayBox}>
                  <span className="label purple">Lecture Recordings</span>
                  <motion.div
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.text}
                  >
                    <a href="https://mediaspace.illinois.edu/channel/BDI%2B475%2BSpring%2B2020%2BSection%2BDAA/">
                      Mediaspace ⟶
                    </a>
                  </motion.div>
                </div>
              </Col>

              <Col md={4}>
                <div className={styles.displayBox}>
                  <span className="label blue">Discussion</span>
                  <motion.div
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.text}
                  >
                    <a href="https://discord.gg/jWF56zsQ7E">Discord ⟶</a>
                  </motion.div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Layout>
  );
}
