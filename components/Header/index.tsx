import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import clsx from "clsx";
import useAuth from "hooks/useAuth";
import { firebaseClient } from "firebase/firebaseClient";

export default function Header() {
  const { user } = useAuth();

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
                    <span className="accent green" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/schedule">
                  <a>
                    Schedule
                    <span className="accent purple" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/assignments">
                  <a>
                    Assignments
                    <span className="accent pink" />
                  </a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/">
                  <a>
                    Notes
                    <span className="accent blue" />
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col md={2}>
            {user ? (
              <a
                className={styles.signOutButton}
                onClick={async () => {
                  await firebaseClient.auth().signOut();
                  window.location.href = "/";
                }}
              >
                Sign Out
              </a>
            ) : (
              <Link href="/login">
                <a>Sign In</a>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}
