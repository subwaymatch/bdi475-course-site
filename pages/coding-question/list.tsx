import React from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import firebase from "firebase";
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

  const questionSummaryList = data
    ? data.map((d): {
        qid: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
      } => {
        return {
          qid: d["NO_ID_FIELD"] as string,
          title: d.title as string,
          createdAt: d.createdAt
            ? (d.createdAt as firebase.firestore.Timestamp).toDate()
            : null,
          updatedAt: d.updatedAt
            ? (d.updatedAt as firebase.firestore.Timestamp).toDate()
            : null,
        };
      })
    : [];

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

          <QuestionList questionSummaryList={questionSummaryList} />
        </Container>
      </main>
    </Layout>
  );
}
