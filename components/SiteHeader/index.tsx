import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import logoImage from "public/images/logo_bdi475.png";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./SiteHeader.module.scss";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BiNote } from "react-icons/bi";
import { FiLogIn, FiCalendar, FiHexagon } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { RiBook3Line, RiUserLine } from "react-icons/ri";
import MenuButton from "components/SiteHeader/MenuButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { desktop } from "constants/media-query-strings";
import Tippy from "@tippyjs/react";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";

const menuItems = [
  {
    href: "/syllabus",
    label: "Syllabus",
    iconChild: <BiNote className={styles.reactIcon} />,
    isActive: (asPath: string) => asPath.startsWith("/syllabus"),
  },
  {
    href: "/schedule",
    label: "Schedule",
    iconChild: <FiCalendar className={styles.reactIcon} />,
    isActive: (asPath: string) => asPath.startsWith("/schedule"),
  },
  {
    href: "/notes",
    label: "Notes",
    iconChild: <RiBook3Line className={styles.reactIcon} />,
    isActive: (asPath: string) => asPath.startsWith("/notes"),
  },
  // {
  //   href: "/assignments",
  //   label: "Assignments",
  //   iconChild: <FiHexagon className={styles.reactIcon} />,
  //   isActive: (asPath: string) => asPath.startsWith("/assignments"),
  // },
];

const SignInButton = forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
  <Link href="/login" legacyBehavior>
    <div ref={ref} className={styles.signInButton}>
      <span className={styles.label}>Sign In</span>
      <RiUserLine className={styles.reactIcon} />
    </div>
  </Link>
));

const SignOutButton = () => {
  const router = useRouter();

  return (
    <a
      className={styles.signOutButton}
      onClick={async () => {
        await supabaseClient.auth.signOut();
        toast.success("Successfully signed out, bye!");
        router.push("/");
      }}
    >
      <span className={styles.label}>Sign Out</span>
      <FiLogIn className={styles.reactIcon} />
    </a>
  );
};

const UserMenu = () => {
  const isScreenDesktop = useMediaQuery(desktop);
  const { user } = useSupabaseAuth();

  return (
    <Row className="align-items-middle">
      <Col>
        <div className={styles.userMenu}>
          {user ? (
            <SignOutButton />
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

const HeaderDesktopMenu = () => {
  const router = useRouter();

  return (
    <Row className={clsx(styles.mainMenu, "align-items-center")}>
      {menuItems.map((item) => (
        <Col key={item.href}>
          <Link
            href={item.href}
            className={clsx(styles.menuLink, {
              [styles.isActive]: item.isActive
                ? item.isActive(router.asPath)
                : false,
            })}>

            <span>{item.label}</span>

          </Link>
        </Col>
      ))}
    </Row>
  );
};

const HeaderMobileMenu = () => (
  <Row className={clsx(styles.mobileMenu)}>
    {menuItems.map((item) => (
      <Col xs={12} key={item.href}>
        <Link href={item.href} className={styles.menuLink}>

          <span>{item.label}</span>
          {item.iconChild && (
            <span className={styles.iconWrapper}>{item.iconChild}</span>
          )}

        </Link>
      </Col>
    ))}

    <Col xs={12}>
      <UserMenu />
    </Col>
  </Row>
);

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScreenDesktop = useMediaQuery(desktop);

  useEffect(() => {
    if (isScreenDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isScreenDesktop]);

  return <>
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
      <Container fluid>
        <Col>
          <div className={styles.inner}>
            <Row className="align-items-center">
              <Col md={2} style={{ lineHeight: 0 }}>
                <Link href="/" className={clsx(styles.logoLink)}>

                  <Image
                    src={logoImage}
                    alt="BDI 475"
                    width={110}
                    height={28}
                  />

                </Link>
              </Col>

              <Col md={8} className="d-none d-md-block">
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
          </div>
        </Col>
      </Container>
    </header>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className={styles.mobileMenuWrapper}
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
          <Container fluid>
            <HeaderMobileMenu />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}
