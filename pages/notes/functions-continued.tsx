import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

export default function FunctionPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Functions, cont'd
                <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>Recap how to create and call a function.</>,
              <>
                Recap function inputs (
                <span className="color-blue">parameters</span>) and output (
                <span className="color-blue">return value</span>).
              </>,
              <>Introduce variable scope.</>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1614186674643.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge
            challengeId="tgAqpi"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="u5kAW4"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="nP0VaY"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="Rz7WbO"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="JrNKop"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="hOutep"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="4DLeS7"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="zqDPpv"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="WLIt7B"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="elcwON"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="Ae23Hb"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="UCKPKa"
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Variable Scopes</h3>
            <span className="label blue">Global Scope</span>

            <p>
              Any variable that is declared outside of the function is in the
              <strong>global scope</strong>. A variable in the global scope is
              called a global variable. Both <code>global_one</code> and
              <code>global_two</code> variables in the code below are examples
              of global variables.
            </p>

            <p>
              <img
                src="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/global-scope-example-01.png"
                alt="Global Variables"
              />
            </p>
          </CenteredColumn>

          <RecordedPythonChallenge
            challengeId="RZsJ2C"
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Variable Scopes</h3>
            <span className="label pink">Function Scope</span>

            <p>
              Any variable that is used inside a function is in the function
              scope. A variable in the function scope is called a{" "}
              <strong>local</strong> variable. When a function is called, a
              function scope for that function is created. The function scope
              includes both the arguments of the function and any variables
              created inside the function.
            </p>

            <p>
              <img
                src="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/function-scope-example-02.png"
                alt="Local Variables"
              />
            </p>
          </CenteredColumn>

          <RecordedPythonChallenge
            challengeId="Ydiw2T"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="aeApjn"
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <span className="label green">What happened?</span>

            <p>
              Python throws an error 🚫 since <code>x</code> is already
              destroyed! Remember, function arguments reside in the local
              environment of the function and are destroyed once the function
              finishes running.
            </p>

            <p>
              <img
                src="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/function-scope-example-03.png"
                alt="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/function-scope-example-03.png"
              />
            </p>
          </CenteredColumn>

          <RecordedPythonChallenge
            challengeId="ifBxj5"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="WHohdq"
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
