import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

const CodeEditor = dynamic(() => import("components/CodeEditor"), {
  ssr: false,
});

export default function TestPage() {
  const [userCode, setUserCode] = useState("print('hi')");

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1 className="pageTitle">Test Page</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>Hello World</p>
            <CodeEditor
              editorValue={userCode}
              onChange={setUserCode}
              language="python"
              height={"300px"}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
