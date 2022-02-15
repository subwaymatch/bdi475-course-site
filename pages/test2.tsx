import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import * as Comlink from "comlink";
import { useEffect, useRef } from "react";

export default function TestPage() {
  const classRef = useRef<any>();

  const init = async () => {
    const instance = await new classRef.current();
    await instance.initialize();
    const result = await instance.runCode("print('Hello')\n3 + 4");

    console.log(result);
  };

  useEffect(() => {
    const MyClass = Comlink.wrap(
      new Worker(new URL("lib/pyodide-comlink/worker.ts", import.meta.url))
    );

    classRef.current = MyClass;

    init();
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Markdown Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>Test</Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
