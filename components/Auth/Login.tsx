import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdDone } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import styles from "./Login.module.scss";
import clsx from "clsx";
import { supabaseClient } from "lib/supabase/supabaseClient";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const [netId, setNetId] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendSignInLink = async (email: string) => {
    try {
      setIsSendingEmail(true);
      setErrorMessage("");

      const { error: signInError } = await supabaseClient.auth.signIn({
        email,
      });

      if (signInError) {
        setErrorMessage(signInError.message);
        toast.error(signInError.message);
      } else {
        setIsEmailSent(true);
        toast.success(`Successfully sent a sign-in link to ${email}`);
      }
    } catch (err) {
      const errorMessage = err.message;

      toast.error(errorMessage);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (isSendingEmail || isEmailSent) {
      return;
    }

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
              <span className="green label">NetID</span>
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
              <a
                className={clsx("green", "button", {
                  disabled: isSendingEmail || isEmailSent,
                })}
                onClick={() => {
                  submit();
                }}
              >
                {isEmailSent ? (
                  <>
                    <span className={styles.label}>Check your Inbox</span>
                    <MdDone className={styles.reactIcon} />
                  </>
                ) : isSendingEmail ? (
                  <>
                    <span className={styles.label}>Sending Email</span>
                    <CircularProgress color="inherit" size={20} />
                  </>
                ) : (
                  <>
                    <span className={styles.label}>Email Me</span>
                    <RiSendPlaneLine className={styles.reactIcon} />
                  </>
                )}
              </a>
            </Col>
            <Col md={8} xs={12}>
              <p className={styles.note}>
                This will send a sign-in link to your{" "}
                <span className="color-green">@illinois.edu</span> email.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              {errorMessage && (
                <p style={{ marginTop: "2rem" }} className="color-orange">
                  {errorMessage}
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </form>
    </main>
  );
}
