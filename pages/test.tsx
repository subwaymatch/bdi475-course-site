import { Col, Container, Row } from "react-bootstrap";
import usePythonExecutor from "hooks/usePythonExecutor";

export default function PyodideTestPage() {
  const {
    isExecutorLoaded,
    isExecutorReady,
    loadPackages,
    runCode,
    runAndCheckCode,
  } = usePythonExecutor();

  const run = async (e) => {
    e.preventDefault();

    await loadPackages("numpy");

    const result = await runCode(
      "import numpy as np\nprint(np.mean([10, 20, 30]))\n"
    );

    console.log("Run");
    console.log(result);
  };

  return (
    <Container>
      <Row>
        <Col>
          {isExecutorLoaded && isExecutorReady ? (
            <a onClick={run}>Run</a>
          ) : (
            "Loading..."
          )}
        </Col>
      </Row>
    </Container>
  );
}
