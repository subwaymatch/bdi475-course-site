import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import firebase from "firebase";
import { useFirestore } from "reactfire";
import QuestionList from "components/question-list";
import styles from "styles/pages/coding-question/list.module.scss";
import { QuestionListItemProps } from "components/question-list/QuestionListItem";

export default function CodingQuestionListPage() {
  const pageSize = 5;
  const [questionListItems, setQuestionListItems] = useState([]);
  const [firstDoc, setFirstDoc] = useState<firebase.firestore.DocumentData>({});
  const [lastDoc, setLastDoc] = useState<firebase.firestore.DocumentData>({});
  const [status, setStatus] = useState("loading");

  let query = useFirestore()
    .collection("codingQuestions")
    .orderBy("updatedAt", "desc")
    .limit(pageSize);

  const queryDocs = () => {
    query.get().then((documentSnapshots) => {
      console.log(`documentSnapshots`);
      console.log(documentSnapshots);

      if (documentSnapshots.docs.length > 0) {
        setFirstDoc(documentSnapshots.docs[0]);
        setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      }

      const docsData: QuestionListItemProps[] = documentSnapshots.docs.map(
        (codingQuestion) => {
          const qid = codingQuestion.id;
          const data = codingQuestion.data();

          return {
            qid,
            permalink: `/coding-question/view/${qid}`,
            title: data.title,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
            updatedAt: data.updatedAt ? data.createdAt.toDate() : null,
            editLink: `/coding-question/edit/${qid}`,
            onDelete: () => {},
          };
        }
      );

      setQuestionListItems(docsData);
      setStatus("success");
    });
  };

  useEffect(() => {
    queryDocs();
  }, []);

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

          <QuestionList items={questionListItems} />

          <Row>
            <Col md={6}>
              <div onClick={() => {}}>Prev</div>
            </Col>
            <Col md={6}>
              <div onClick={() => {}}>Next</div>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
