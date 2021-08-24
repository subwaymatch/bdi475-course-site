import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdDone } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { clickableVariants } from "animations/clickableVariants";
import styles from "./Login.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import { supabaseClient } from "lib/supabase/supabaseClient";

export default function Login() {
  const [netId, setNetId] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const sendSignInLink = async (email: string) => {
    try {
      setError("");

      const { error: signInError } = await supabaseClient.auth.signIn({
        email,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        window.localStorage.setItem("emailForSignIn", email);
        setIsEmailSent(true);
      }

      toast.success(`Successfully sent a sign-in link to ${email}`);
    } catch (err) {
      const errorMessage = err.message;

      toast.error(errorMessage);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    let userEmail;

    // If the user has typed a full email, do not append @illinois.edu to the end
    if (netId.includes("@")) {
      userEmail = netId;
    } else {
      userEmail = netId + "@illinois.edu";
    }

    sendSignInLink(userEmail);
  };

  return (
    <main className={styles.authPage}>
      <form onSubmit={submit}>
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
                  styles.formTitle
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

          <Row className="align-items-center g-0">
            <Col>
              <div className={styles.inputWrapper}>
                <input
                  name="userEmail"
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
                  onClick={submit}
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

          <Row>
            <Col>
              <div style={{ color: "red" }}>This is an error message box.</div>
            </Col>
          </Row>
        </Container>
      </form>
    </main>
  );
}
