import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import Chip from "components/common/Chip";

export default function FunctionPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Functions, cont'd</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>Recap how to create and call a function.</>,
              <>
                Recap function inputs (
                <span className="color-green">parameters</span>) and output (
                <span className="color-green">return value</span>).
              </>,
              <>Introduce variable scope.</>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1614186667983.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={55}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={79}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={83}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={115}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={103}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={104}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={105}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={76}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={108}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={109}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={106}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={107}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Variable Scopes</h3>
            <Chip color="blue">Global Scope</Chip>

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

          <RecordedPythonChallengeById
            challengeId={110}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Variable Scopes</h3>
            <Chip color="pink">Function Scope</Chip>

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

          <RecordedPythonChallengeById
            challengeId={112}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={111}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <Chip color="green">What happened?</Chip>

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

          <RecordedPythonChallengeById
            challengeId={113}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={114}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
