import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

export default function QuizPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Quiz 2
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h3>Sample Questions</h3>

            <span className="label purple">Preparation for Quiz 2</span>
            <p>
              These questions are highly similar to what you'll see on Quiz 2.
              😀{" "}
              <strong>This page is entirely optional and isn't graded.</strong>{" "}
              <span className="color-blue">
                However, it will help you prepare for the quiz.
              </span>{" "}
              There will be only two questions on Quiz 2 (what a coincidence,
              there are only two questions here 😏!).
            </p>
          </CenteredColumn>

          <RecordedPythonChallenge challengeId={45} className={styles.block} />

          <RecordedPythonChallenge challengeId={46} className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
