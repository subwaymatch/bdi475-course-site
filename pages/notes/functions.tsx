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
                Introduction to Functions
                <span className="accent pink" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Recap the <code>list</code>, <code>dict</code> data types and{" "}
                <code>for</code> loops.
              </>,
              <>
                Recap the string (<code>str</code>) data type and related
                utility methods.
              </>,
              <>Introduce the concept of functions.</>,
              <>
                Learn how to create new functions using the <code>def</code>{" "}
                keyword.
              </>,
              <>Learn parameters and return values.</>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1614015382392.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge
            challengeId="MAij4e"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="aULgTB"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="xAZehL"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="bF23yB"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="QDn300"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="2O1csh"
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>What are functions?</h3>

            <span className="label green">Back to Algebra</span>

            <p>
              Let's forget about Python for a moment and go back a few years all
              the way back to Algebra. Do you remember any expressions that
              resemble the form of <code>f(x) = x + 3</code>?
            </p>

            <p>
              <code>f(x) = x + 3</code> is a <em>function</em>. For any given{" "}
              <code>x</code>, the function will add <code>3</code> to{" "}
              <code>x</code> and return that value.
            </p>

            <ul>
              <li>
                <code>f(5) = 5 + 3</code>, returns <code>8</code>
              </li>

              <li>
                <code>f(10) = 10 + 3</code>, returns <code>13</code>
              </li>

              <li>
                <code>f(-3) = -3 + 3</code>, returns <code>0</code>
              </li>
            </ul>

            <p>
              In mathematical terms, a function takes one or more inputs and
              produces an output. Our previous function{" "}
              <code>f(x) = x + 3</code> can be broken down into:
            </p>

            <p>
              <img
                src="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/function-breakdown-01.png"
                alt="Function Breakdown"
              />
            </p>

            <p>
              <code>f</code> in front of the parentheses is an arbitrary name
              used to represent a function. We can choose to rename our function
              to <code>add_three</code>. This changes our function expression to{" "}
              <code>add_three(x) = x + 3</code>.
            </p>

            <p>
              A function can also take more than one input (e.g.,{" "}
              <code>add(a, b) = a + b</code>).
            </p>

            <p>
              In programming, an inputs is referred as an <em>argument</em>, and
              an output is referred as a <em>return value</em>.
            </p>

            <p>
              <img
                src="https://accy570-fa2020-course-site-assets.s3-us-west-2.amazonaws.com/images/function-diagram-01.png"
                alt="Function Diagram"
              />
            </p>
          </CenteredColumn>

          <RecordedPythonChallenge
            challengeId="MSYxAM"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="3Ubagd"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="JnTExm"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="DmaGpd"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="ThsXV0"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="N8pjpw"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="w4mn5F"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="IOeA2s"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="OAS9vf"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="jR3Wxg"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="rr9KIl"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="6qiy24"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="1iHGVQ"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="MV0U9q"
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
