import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import clsx from "clsx";
import useAuth from "hooks/useAuth";
import { firebaseClient } from "firebase/firebaseClient";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FiLogIn } from "react-icons/fi";
import ReactTooltip from "react-tooltip";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

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
                    alt="BDI 475"
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
                  <motion.a
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Syllabus
                    <span className="accent green" />
                  </motion.a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/schedule">
                  <motion.a
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Schedule
                    <span className="accent purple" />
                  </motion.a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/notes">
                  <motion.a
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Notes
                    <span className="accent blue" />
                  </motion.a>
                </Link>
              </Col>

              <Col md={3}>
                <Link href="/assignments">
                  <motion.a
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Assignments
                    <span className="accent pink" />
                  </motion.a>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col md={2}>
            <div className={styles.userMenu}>
              {user ? (
                <a
                  className={styles.signOutButton}
                  onClick={async () => {
                    await firebaseClient.auth().signOut();
                    toast.success("Successfully signed out, bye!");
                    router.push("/");
                  }}
                >
                  Sign Out
                </a>
              ) : (
                <Link href="/login">
                  <motion.a
                    variants={clickableVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={styles.signInButton}
                    data-tip
                    data-for="signInTooltip"
                  >
                    Sign In
                    <FiLogIn className={styles.reactIcon} />
                  </motion.a>
                </Link>
              )}
              <ReactTooltip
                id="signInTooltip"
                place="left"
                effect="solid"
                className={styles.tooltip}
              >
                <span>
                  Sign in to access materials that are only visible to
                  registered students
                </span>
              </ReactTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
