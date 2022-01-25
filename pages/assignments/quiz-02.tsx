import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import Chip from "components/common/Chip";

export default function Exercise() {
  const codingChallengeIds = [45, 46, 56, 123];

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Quiz 2</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Exercise Details ⟶"
            items={[
              <>
                You have until end of the day Friday (Sep 24, 11:59 PM CST) to
                complete this quiz.
              </>,
              <>
                You get{" "}
                <span className="color-green">
                  an unlimited number of attempts
                </span>
                .
              </>,
              <>
                We may deduct points upon a manual code review even if you pass
                the test cases.
              </>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/case-studies/553675_v6_adidas_com.jpg"
                  width={1600}
                  height={512}
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
