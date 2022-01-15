import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";

export default function ProblemSetPage() {
  const codingChallengeIds = [116, 117, 118, 119, 120, 121, 122];

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Problem Set 1</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Problem Set 1 ⟶"
            items={[
              <>
                You have until{" "}
                <span className="color-purple">
                  Tuesday before the beginning of the class
                </span>{" "}
                (Sep 21, 3:30 PM CST) to complete this exercise.
              </>,
              <>
                You get{" "}
                <span className="color-blue">
                  an unlimited number of attempts
                </span>
                .
              </>,
              <>
                Make sure to see{" "}
                <span className="color-green">green checkmarks</span> for each
                challenge.
              </>,
              <>We may deduct points upon a manual code review.</>,
              <>
                There are <span className="color-purple">80 points</span>{" "}
                available (10 points for each question except the last one which
                accounts for 20 points).
              </>,
            ]}
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
              All exercises in this problem set is designed to challenge you. 👽
              If you're stuck, I encourage you to post your question along with
              the code on the{" "}
              <a href="https://canvas.illinois.edu/courses/14860/discussion_topics/99898">
                Problem Set 1 Canvas discussion forum
              </a>{" "}
              to get help.
            </p>

            <span className="label yellow">Extra Office Hours</span>
            <p>I will be holding two extra office hours over Zoom. 📺</p>
            <ul>
              <li>
                Sunday <span className="color-gray">9/19</span> 8-9 PM
              </li>
              <li>
                Monday <span className="color-gray">9/20</span> 8-9 PM
              </li>
              <li>
                <a href="https://illinois.zoom.us/j/88199992344?pwd=dTMvdnM3SHF4eE11NnBjZGJ6NGhMZz09">
                  Office Hours Zoom Link ⟶
                </a>
              </li>
            </ul>
            <p>
              If both time slots don't work and you'd like to set up a separate
              Zoom session, please email me at{" "}
              <a href="mailto:ypark32@illinois.edu">ypark32@illinois.edu</a>. 👋
            </p>
          </CenteredColumn>

          {codingChallengeIds.map((challengeId) => (
            <RecordedPythonChallengeById
              key={challengeId}
              challengeId={challengeId}
              className={styles.block}
              showSolution={false}
            />
          ))}
        </Container>
      </main>
    </Layout>
  );
}
