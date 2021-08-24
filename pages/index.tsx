import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { clickableVariants } from "animations/clickableVariants";
import styles from "styles/pages/index.module.scss";

export default function MainPage() {
  return (
    <Layout>
      <main className={styles.mainPage}>
        <Container>
          <div className={styles.courseTitleWrapper}>
            <Row>
              <Col>
                <h1>Introduction to Data Analytics Applications in Business</h1>
              </Col>
            </Row>
          </div>

          <div className={styles.linksSection}>
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
                  <span className="label yellow">Office Hours</span>
                  <motion.div
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.text}
                  >
                    <a href="https://illinois.zoom.us/j/88199992344?pwd=dTMvdnM3SHF4eE11NnBjZGJ6NGhMZz09">
                      Zoom Link ⟶
                    </a>
                  </motion.div>
                  <div>Every Wednesday 3-4 PM</div>
                </div>
              </Col>

              <Col md={4}>
                <div className={styles.displayBox}>
                  <span className="label green">Lecture Recordings</span>
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
                  <span className="label purple">Course Page</span>
                  <motion.div
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.text}
                  >
                    <a href="https://canvas.illinois.edu/courses/14860/">
                      Canvas ⟶
                    </a>
                  </motion.div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </main>
    </Layout>
  );
}
