import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

export default function QuizPage() {
  const codingChallengeIds = [210, 211, 212, 213];

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Quiz 1</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Quiz Details ⟶"
            items={[
              <>
                You have until{" "}
                <span className="color-purple">end of the day Monday</span> (Sep
                13, 11:59 PM CST) to complete this quiz.
              </>,
              <>
                You get{" "}
                <span className="color-blue">
                  an unlimited number of attempts
                </span>
                .
              </>,
              <>
                Passing the test cases (
                <span className="color-green">Green Checkmarks</span>) usually
                equates to full points.
              </>,
              <>However, we may deduct points upon a manual code review.</>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612327404248.png"
                  width={1500}
                  height={500}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h3>How to Complete Your Assignment</h3>

            <span className="label green">Green Checkmarks</span>
            <p>
              You will have to complete the coding challenges below. There is no
              time limit or a submit button. You only need to check whether you
              see a <span className="color-green">green checkmark</span> on the
              top-right corner of each challenge. You must be signed in to
              record your submission.
            </p>

            <span className="label purple">Grading</span>

            <p>We will only look at your final successful attempt.</p>
          </CenteredColumn>

          {codingChallengeIds.map((challengeId) => (
            <RecordedPythonChallenge
              key={challengeId}
              challengeId={challengeId}
              className={styles.block}
            />
          ))}
        </Container>
      </main>
    </Layout>
  );
}
