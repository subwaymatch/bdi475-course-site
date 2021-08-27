import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { AuthCheck } from "reactfire";
import Login from "components/Auth/Login";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

export default function ProblemSetPage() {
  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        <main className={styles.page}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle grayBottomBorder">
                  Problem Set 1
                  <span className="accent purple" />
                </h2>
              </Col>
            </Row>

            <ListWithTitle
              title="Problem Set 1 ⟶"
              items={[
                <>
                  This is a substitute assignment for the first case study. The
                  questions on Monday's Quiz 2 will be{" "}
                  <strong>very similar</strong> to some of these questions.
                </>,
                <>
                  You have until{" "}
                  <span className="color-pink">
                    Monday before the beginning of the class
                  </span>{" "}
                  (Mar 1, 1:59 PM CST) to complete this problem set.
                </>,
                <>
                  You get <span className="color-blue">unlimited attempts</span>
                  .
                </>,
                <>
                  There is no separate submit button. Your code is automatically
                  submitted when you hit the <strong>Check</strong> button.
                </>,
                <>
                  There are <span className="color-purple">80 points</span>{" "}
                  available.
                </>,
                <>
                  Passing the test cases does not guarantee you full points. We
                  will manually review your code.
                </>,
                <>
                  If you make a{" "}
                  <span className="color-purple">late submission</span>,{" "}
                  <strong>
                    we will deduct 10% of the total available points per day.
                  </strong>
                </>,
              ]}
              className={styles.block}
            />

            <Row>
              <Col>
                <div className={styles.coverImage}>
                  <Image
                    src="/images/case-studies/ShareholderResources_Hero_Desktop.jpg"
                    width={1440}
                    height={810}
                    alt=""
                  />
                </div>
              </Col>
            </Row>

            <CenteredColumn className={styles.textBox}>
              <h3>Getting Help</h3>

              <span className="label green">Discord</span>
              <p>
                All exercises in this problem set is designed to challenge you.
                👽 If you're stuck, I encourage you to post your question along
                with the code on{" "}
                <a href="https://discord.gg/jWF56zsQ7E">course discord</a> to
                get help.
              </p>

              <span className="label yellow">Extra Office Hours</span>
              <p>
                I also plan to hold extra office hours on the weekend. If you
                are lost and need help, please email me at{" "}
                <a href="mailto:ypark32@illinois.edu">ypark32@illinois.edu</a>.
              </p>
            </CenteredColumn>

            <RecordedPythonChallenge
              challengeId="IoPUN0"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="pAXDI1"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="fveynH"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="ulmG64"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="GemfF1"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="8rzCEk"
              className={styles.block}
            />

            <RecordedPythonChallenge
              challengeId="VnrUu9"
              className={styles.block}
            />
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}
