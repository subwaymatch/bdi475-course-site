import { useState } from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import { RiSendPlaneLine } from "react-icons/ri";
import styles from "styles/pages/login.module.scss";
import clsx from "clsx";
import { firebaseClient } from "firebase/firebaseClient";

export default function LoginPage() {
  const [netId, setNetId] = useState("");

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
              <a className="greenButton">
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
