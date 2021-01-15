import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import clsx from "clsx";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <Row className="align-items-center">
          <Col md={2}>
            <div
              style={{
                lineHeight: 0,
              }}
            >
              <Link href="/">
                <a className={styles.logoLink}>
                  <Image
                    src="/images/logo_bdi475.svg"
                    alt="Tabbied"
                    layout="fixed"
                    width={124}
                    height={25}
                  />
                </a>
              </Link>
            </div>
          </Col>

          <Col md={8}>
            <Row className={clsx(styles.mainMenu, "align-items-center")}>
              <Col md={3}>
                <Link href="/syllabus">
                  <a>
                    Syllabus
                    <span className="greenAccent" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/schedule">
                  <a>
                    Schedule
                    <span className="purpleAccent" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/assignments">
                  <a>
                    Assignments
                    <span className="pinkAccent" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/">
                  <a>
                    Notes
                    <span className="blueAccent" />
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
