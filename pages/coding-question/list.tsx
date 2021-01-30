import React from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import {
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollectionData,
} from "reactfire";
import styles from "styles/pages/coding-question/list.module.scss";

export default function CodingQuestionList() {
  const codingQuestionsCollection = useFirestore().collection(
    "codingQuestions"
  );

  const { status, data } = useFirestoreCollectionData(
    codingQuestionsCollection
  );

  console.log(`status=${status}`);
  console.log(data);

  if (typeof window !== "undefined") {
    (window as any).data = data;
  }

  return status === "loading" ? (
    <Layout excludeHeader={true}>
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    </Layout>
  ) : (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Coding Questions</h1>
            </Col>
          </Row>

          {(data as any).map((q) => {
            console.log(data["NO_ID_FIELD"]);

            return (
              <React.Fragment key={q["NO_ID_FIELD"]}>
                <Row>
                  <Col>
                    <Link href={`/coding-question/edit/${q["NO_ID_FIELD"]}`}>
                      <div>{q.title}</div>
                    </Link>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Container>
      </main>
    </Layout>
  );
}
