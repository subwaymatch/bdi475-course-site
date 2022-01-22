import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import RecordedMultipleChoiceQuestion from "components/common/RecordedMultipleChoiceQuestion";
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

          <RecordedMultipleChoiceQuestion questionId={1} />

          <RecordedMultipleChoiceQuestion
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
