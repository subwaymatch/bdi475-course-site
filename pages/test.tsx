import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import RecordedMultipleChoiceQuestion from "components/common/RecordedMultipleChoiceQuestion";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

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
              <RecordedMultipleChoiceQuestion questionId={1} />

              <RecordedMultipleChoiceQuestion questionId={2} />

              <RecordedPythonChallenge
                challengeId={211}
                className={styles.block}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
