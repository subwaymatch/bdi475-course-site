import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import Chip from "components/common/Chip";

export default function Exercise() {
  const codingChallengeIds = [177, 173, 174, 175, 172, 176, 171, 168, 169, 170];

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Exercise 1</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Exercise Details ⟶"
            items={[
              <>
                You have until{" "}
                <strong className="color-purple">
                  Thursday before the beginning of the class
                </strong>{" "}
                (Jan 27, 12:30 PM CST) to complete this exercise.
              </>,
              <>
                You get{" "}
                <span className="color-blue">unlimited number of attempts</span>
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
                  src="/images/exercises/exercise_01_cover_image.jpg"
                  width={1600}
                  height={600}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h3>How to Complete Your Assignment</h3>

            <Chip color="green">Green Checkmarks</Chip>
            <p>
              You will have to complete the coding challenges below. There is no
              time limit or a submit button. You only need to check whether you
              see a <span className="color-green">green checkmark</span> on the
              top-right corner of each challenge. You must be signed in to
              record your submission.
            </p>

            <Chip color="purple">Grading</Chip>

            <p>We will only look at your final successful attempt.</p>
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
