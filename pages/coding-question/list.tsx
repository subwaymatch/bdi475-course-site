import React from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import QuestionList from "components/question-list";
import styles from "styles/pages/coding-question/list.module.scss";

export default function CodingQuestionListPage() {
  const codingQuestionsCollection = useFirestore().collection(
    "codingQuestions"
  );

  const { status, data } = useFirestoreCollectionData(
    codingQuestionsCollection
  );

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
              <h2 className="sectionTitle grayBottomBorder">
                Coding question
                <span className="accent pink" />
              </h2>
            </Col>
          </Row>

          <QuestionList questionDataList={data} />
          {/* 
          {(data as any).map((q) => {
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
          })} */}
        </Container>
      </main>
    </Layout>
  );
}
