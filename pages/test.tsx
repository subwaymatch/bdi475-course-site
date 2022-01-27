import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import RecordedMultipleChoiceQuestionById from "components/common/RecordedMultipleChoiceQuestionById";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import Chip from "components/common/Chip";

export default function TestPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Test Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Chip label="Test Chip" small />
            </Col>
          </Row>

          <RecordedMultipleChoiceQuestionById questionId={1} />

          <RecordedMultipleChoiceQuestionById
            questionId={2}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={211}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
