import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { useAuth } from "reactfire";
import { motion, AnimatePresence } from "framer-motion";
import { clickableVariants } from "animations/clickableVariants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IoBookOutline } from "react-icons/io5";
import { BiHomeAlt, BiNote } from "react-icons/bi";
import { FiLogIn, FiBookOpen, FiCalendar, FiHexagon } from "react-icons/fi";
import { RiBook3Line } from "react-icons/ri";
import MenuButton from "components/Header/MenuButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { desktop } from "constants/media-query-strings";
import Tippy from "@tippyjs/react";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const menuItems = [
  {
    href: "/",
    label: "Home",
    iconChild: <BiHomeAlt className={styles.reactIcon} />,
  },
  {
    href: "/syllabus",
    label: "Syllabus",
    iconChild: <BiNote className={styles.reactIcon} />,
  },
  {
    href: "/schedule",
    label: "Schedule",
    iconChild: <FiCalendar className={styles.reactIcon} />,
  },
  {
    href: "/notes",
    label: "Notes",
    iconChild: <RiBook3Line className={styles.reactIcon} />,
  },
  {
    href: "/assignments",
    label: "Assignments",
    iconChild: <FiHexagon className={styles.reactIcon} />,
  },
];

const HeaderDesktopMenu = () => (
  <Row className={clsx(styles.mainMenu, "align-items-center")}>
    {menuItems.map((item) => (
      <Col key={item.href}>
        <Link href={item.href}>
          <a className={styles.menuLink}>
            {item.iconChild && (
              <span className={styles.iconWrapper}>{item.iconChild}</span>
            )}
            <span>{item.label}</span>
          </a>
        </Link>
      </Col>
    ))}
  </Row>
);

const HeaderMobileMenu = () => (
  <Row className={clsx(styles.mainMenu, styles.mobile)}>
    {menuItems.map((item) => (
      <Col xs={12} key={item.href}>
        <Link href={item.href}>
          <a className={styles.menuLink}>
            <span>{item.label}</span>
            {item.iconChild && (
              <span className={styles.iconWrapper}>{item.iconChild}</span>
            )}
          </a>
        </Link>
      </Col>
    ))}
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
            <Col md={10} className="d-none d-md-block">
              <HeaderDesktopMenu />
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
              <HeaderMobileMenu />

              <UserMenu />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
