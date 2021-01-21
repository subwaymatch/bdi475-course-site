import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/login.module.scss";
import clsx from "clsx";

export default function LoginPage() {
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

          <Row className="align-items-center">
            <Col>
              <div className={styles.inputWrapper}>
                <span className="greenLabel">NetID</span>
                <input
                  type="text"
                  placeholder="mynetid"
                  className={styles.netIdInput}
                />
              </div>
            </Col>

            <Col>
              <div className={styles.emailFormat}>@illinois.edu</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.buttonWrapper}>
                <a className="greenButton">Email Me</a>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className={styles.note}>
                Please use your @illinois.edu email to sign in.
              </p>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
