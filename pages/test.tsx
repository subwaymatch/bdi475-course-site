import { asyncRun } from "lib/pyodide/pyodide-bridge";
import { Col, Container, Row } from "react-bootstrap";

export default function PyodideTestPage() {
  const run = async (e) => {
    e.preventDefault();
    await asyncRun();
  };

  return (
    <Container>
      <Row>
        <Col>
          <a onClick={run}>Run</a>
        </Col>
      </Row>
    </Container>
  );
}
