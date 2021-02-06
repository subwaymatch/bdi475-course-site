import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { useAuth } from "reactfire";
import { motion, AnimatePresence } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FiLogIn } from "react-icons/fi";
import MenuButton from "components/Header/MenuButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { desktop } from "constants/media-query-strings";
import Tippy from "@tippyjs/react";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const HeaderMenu = () => (
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
);

const SignInButton = forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
  return (
    <Link href="/login">
      <motion.div
        ref={ref}
        variants={clickableVariants}
        whileHover="hover"
        whileTap="tap"
        className={styles.signInButton}
      >
        <span className={styles.label}>Sign In</span>
        <FiLogIn className={styles.reactIcon} />
      </motion.div>
    </Link>
  );
});

const UserMenu = () => {
  const auth = useAuth();
  const { user } = useFirebaseAuth();
  const router = useRouter();
  const isScreenDesktop = useMediaQuery(desktop);

  return (
    <Row className="align-items-middle">
      <Col>
        <div className={styles.userMenu}>
          {user ? (
            <a
              className={styles.signOutButton}
              onClick={async () => {
                await auth.signOut();
                toast.success("Successfully signed out, bye!");
                router.push("/");
              }}
            >
              Sign Out
            </a>
          ) : (
            <Tippy
              disabled={!isScreenDesktop}
              content="Requires @illinois email"
              placement="bottom"
              className="tippy"
              theme="light"
            >
              <SignInButton />
            </Tippy>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScreenDesktop = useMediaQuery(desktop);

  useEffect(() => {
    if (isScreenDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isScreenDesktop]);

  return (
    <>
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={(e) => {
            e.preventDefault();

            setIsMenuOpen(false);
          }}
        />
      )}

      <header className={styles.header}>
        <Container>
          <Row className="align-items-center">
            <Col md={2} xs={6}>
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

            <Col md={8} className="d-none d-md-block">
              <HeaderMenu />
            </Col>

            <Col md={2} className="d-none d-md-block">
              <UserMenu />
            </Col>

            <Col xs={6} className="d-md-none">
              <div className={styles.menuBtnWrapper}>
                <MenuButton
                  isOpen={isMenuOpen}
                  onClick={() => {
                    setIsMenuOpen((v) => !v);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit={{
              height: 0,
              opacity: 0,
            }}
            variants={{
              open: {
                height: "auto",
                opacity: 1,
              },
              closed: { height: 0, opacity: 0 },
            }}
          >
            <Container>
              <HeaderMenu />

              <UserMenu />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
