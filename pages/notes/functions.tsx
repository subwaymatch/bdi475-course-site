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
              <h1 className={styles.noteTitle}>
                Introduction to Functions
                <span className="accent pink" />
              </h1>
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
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1614015120608.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={44}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={71}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={75}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={48}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={70}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={63}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>What are functions?</h3>

            <Chip color="green">Back to Algebra</Chip>

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
              <code>add_three(a, b) = a + b</code>).
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

          <RecordedPythonChallengeById
            challengeId={221}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={222}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={68}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={64}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={219}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={65}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={92}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={94}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={220}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={93}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={101}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={97}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={98}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={99}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={100}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={96}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={95}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={102}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
