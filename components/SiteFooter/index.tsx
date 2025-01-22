import { Col, Container, Row } from "react-bootstrap";
import styles from "./SiteFooter.module.scss";
import Image from "next/image";
import courseLogoWhiteImage from "public/images/logo_bdi475_white.png";
import datacampLogoImage from "public/images/datacamp_logo_white.png";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <section className={styles.footer}>
      <Container fluid>
        <Row>
          <Col lg={4} md={12}>
            <Link href="/">
              <a className={styles.logoImageWrapper}>
                <Image
                  src={courseLogoWhiteImage}
                  alt="BDI 475"
                  width={120}
                  height={31}
                />
              </a>
            </Link>
          </Col>

          <Col lg={4} md={12}>
            <div className={styles.linksBox}>
              <h2>Links</h2>

              <ul>
                <li>
                  <Link href="/python-playground/untitled">
                    Python Playground (Experimental)
                  </Link>
                </li>
                <li>
                  <a href="https://cscircles.cemc.uwaterloo.ca/visualize">
                    Visualize Code Execution
                  </a>
                </li>
                <li>
                  <a href="https://www.datacamp.com/">DataCamp</a>
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={4} md={12}>
            <div className={styles.sponsorBox}>
              <h2>Supported by</h2>

              <a href="https://www.datacamp.com" title="DataCamp">
                <Image
                  src={datacampLogoImage}
                  alt="DataCamp"
                  width={240}
                  height={50}
                />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.bottomBox}>
              <Row>
                <Col xs={10}>University of Illinois at Urbana-Champaign</Col>

                <Col xs={2}>
                  <div className={styles.iconLinks}>
                    <a href="https://github.com/subwaymatch/bdi475-course-site">
                      <FaGithub className={styles.reactIcon} />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
