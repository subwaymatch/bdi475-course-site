import { useEffect, useState } from "react";
import nookies from "nookies";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdDone } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import styles from "styles/pages/login.module.scss";
import clsx from "clsx";
import { firebaseClient as firebase } from "firebase/firebaseClient";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";

export default function LoginPage() {
  const [netId, setNetId] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((isSignInWithEmailLink) => {
          window.localStorage.removeItem("emailForSignIn");
          console.log("Sign in complete");
          console.log(`isSignInWithEmailLink=${isSignInWithEmailLink}`);

          toast.success("Successfully signed in");

          window.scrollTo(0, 0);
          router.push("/");
        })
        .catch((err) => {
          console.error("Error signing in through email link");
          toast.error(err.errorMessage);
        });
    }
  }, []);

  const sendSignInLink = async (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: location.href,
      // This must be true.
      handleCodeInApp: true,
    };

    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setIsEmailSent(true);
      console.log(`Successfully sent an email sign in link to ${email}`);

      toast.success(`Successfully sent a sign-in link to ${email}`);
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log(errorCode);
      console.log(errorMessage);

      toast.error(errorMessage);
    }
  };

  return (
    <Layout>
      <main className={styles.loginPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Sign In</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2
                className={clsx(
                  "sectionTitle",
                  "grayBottomBorder",
                  styles.loginFormTitle
                )}
              >
                Using NetId <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <span className="greenLabel">NetID</span>
            </Col>
          </Row>

          <Row className="align-items-center no-gutters">
            <Col>
              <div className={styles.inputWrapper}>
                <input
                  value={netId}
                  onChange={(e) => setNetId(e.target.value)}
                  placeholder="mynetid"
                  className={styles.netIdInput}
                />
              </div>
            </Col>

            <Col>
              <div className={styles.emailFormat}>@illinois.edu</div>
            </Col>
          </Row>

          <Row className={clsx(styles.submitControls, "align-items-center")}>
            <Col md={4} xs={12}>
              {isEmailSent ? (
                <a
                  className="lightGray button disabled"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className={styles.label}>Check your Inbox</span>
                  <MdDone className={styles.reactIcon} />
                </a>
              ) : (
                <motion.a
                  variants={clickableVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="green button"
                  onClick={(e) => {
                    e.preventDefault();
                    sendSignInLink(netId + "@illinois.edu");
                  }}
                >
                  <span className={styles.label}>Email Me</span>
                  <RiSendPlaneLine className={styles.reactIcon} />
                </motion.a>
              )}
            </Col>
            <Col md={8} xs={12}>
              <p className={styles.note}>
                This will send a sign-in link to your{" "}
                <span className="green">@illinois.edu</span> email.
              </p>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));

    await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } catch (err) {
    return { props: {} };
  }
};
