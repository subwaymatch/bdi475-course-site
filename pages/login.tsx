import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import { RiSendPlaneLine } from "react-icons/ri";
import styles from "styles/pages/login.module.scss";
import clsx from "clsx";
import { firebaseClient as firebase } from "firebase/firebaseClient";

export default function LoginPage() {
  const [netId, setNetId] = useState("");

  useEffect(() => {
    console.log(location);

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      console.log("Sign in!");

      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          console.log("Sign in complete");
          console.log(result);

          window.location.href = "/";
        })
        .catch((err) => {
          console.error("Error signing in through email link");
          console.log(err.errorCode);
          console.log(err.errorMessage);
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
      console.log(`Successfully sent an email sign in link to ${email}`);
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.error("Error sending authentication email");
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

  return (
    <Layout>
      <Header />

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
                Using NetId <span className="greenAccent" />
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
              <a
                className="greenButton"
                onClick={(e) => {
                  e.preventDefault();
                  sendSignInLink(netId + "@illinois.edu");
                }}
              >
                <span className={styles.label}>Email Me</span>
                <RiSendPlaneLine className={styles.reactIcon} />
              </a>
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
