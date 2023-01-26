import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/index.module.scss";
import geometricImage1 from "public/images/geometric_01.png";
import geometricImage2 from "public/images/geometric_02.png";
import geometricImage3 from "public/images/geometric_03.png";
import geometricImage4 from "public/images/geometric_04.png";
import Image from "next/image";

export default function MainPage() {
  return (
    <Layout>
      <main className={styles.mainPage}>
        <section className={styles.courseTitleWrapper}>
          <Container fluid>
            <Row>
              <Col>
                <h1>Introduction to Data Analytics Applications in Business</h1>
              </Col>
            </Row>
          </Container>
        </section>

        <section className={styles.linksSection}>
          <Container fluid>
            <Row>
              <Col lg={6}>
                <a
                  href="https://illinois.zoom.us/j/88199992344?pwd=dTMvdnM3SHF4eE11NnBjZGJ6NGhMZz09"
                  className={styles.linkItem}
                >
                  <div className={styles.linkText}>
                    <span className={styles.title}>Zoom Link ⟶</span>
                    <p className={styles.desc}>
                      Office hours are Thursdays 5-6 PM (Park) via Zoom and
                      Tuesdays 2-3 PM in-person (no Zoom) in BIF 2056.
                    </p>
                  </div>

                  <div className={styles.linkImage}>
                    <Image src={geometricImage1} width={160} height={138} />
                  </div>
                </a>
              </Col>

              <Col lg={6}>
                <a
                  href="https://canvas.illinois.edu/courses/34817"
                  className={styles.linkItem}
                >
                  <div className={styles.linkText}>
                    <span className={styles.title}>Canvas ⟶</span>
                    <p className={styles.desc}>
                      View announcements, grades, and all course materials
                    </p>
                  </div>

                  <div className={styles.linkImage}>
                    <Image src={geometricImage3} width={130} height={160} />
                  </div>
                </a>
              </Col>
            </Row>

            <Row>
              <Col lg={6} style={{ display: "none" }}>
                <a
                  href="https://mediaspace.illinois.edu/"
                  className={styles.linkItem}
                >
                  <div className={styles.linkText}>
                    <span className={styles.title}>Mediaspace ⟶</span>
                    <p className={styles.desc}>
                      Lecture recordings are uploaded to this channel.
                    </p>
                  </div>

                  <div className={styles.linkImage}>
                    <Image src={geometricImage2} width={147} height={160} />
                  </div>
                </a>
              </Col>

              <Col lg={6}>
                <a
                  href="https://www.datacamp.com/groups/shared_links/07eeb60021b3ac6340ebb634f55b6edce8eca0b71464d3898701eabf43fc7a3d"
                  className={styles.linkItem}
                >
                  <div className={styles.linkText}>
                    <span className={styles.title}>DataCamp Invitation ⟶</span>
                    <p className={styles.desc}>
                      Practice outside the classroom on a wide range of topics
                    </p>
                  </div>

                  <div className={styles.linkImage}>
                    <Image src={geometricImage4} width={125} height={160} />
                  </div>
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </Layout>
  );
}
