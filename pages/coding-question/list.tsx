import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import firebase from "firebase";
import { AuthCheck, useFirestore } from "reactfire";
import QuestionList from "components/question-list";
import { QuestionListItemProps } from "components/question-list/QuestionListItem";
import styles from "styles/pages/coding-question/list.module.scss";
import { toast } from "react-toastify";
import Login from "components/Login";

enum QueryMode {
  InitialLoad = "InitialLoad",
  ToPrevPage = "ToPrevPage",
  ToNextPage = "ToNextPage",
}

export default function CodingQuestionListPage() {
  let pageSize = 20;
  const firestore = useFirestore();
  const collectionRef = firestore.collection("codingQuestions");
  let defaultQuery = collectionRef
    .orderBy("updatedAt", "desc")
    .limit(pageSize + 1);

  const [queryMode, setQueryMode] = useState<QueryMode>(QueryMode.InitialLoad);
  const [query, setQuery] = useState<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  >(defaultQuery);
  const [questionListItems, setQuestionListItems] = useState([]);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [firstDoc, setFirstDoc] = useState<firebase.firestore.DocumentData>();
  const [lastDoc, setLastDoc] = useState<firebase.firestore.DocumentData>();
  const [status, setStatus] = useState("loading");

  const queryDocs = () => {
    query.get().then((snapshot) => {
      const numDocs = snapshot.docs.length;
      const hasMore = numDocs > pageSize;
      const currentDocs = hasMore
        ? queryMode === QueryMode.ToPrevPage
          ? snapshot.docs.slice(1)
          : snapshot.docs.slice(0, pageSize)
        : snapshot.docs;

      if (numDocs > 0) {
        setFirstDoc(currentDocs[0]);
        setLastDoc(currentDocs[currentDocs.length - 1]);
      }

      if (queryMode === QueryMode.ToPrevPage) {
        setHasPrevPage(hasMore);
        setHasNextPage(true);
      } else if (queryMode === QueryMode.ToNextPage) {
        setHasPrevPage(true);
        setHasNextPage(hasMore);
      } else {
        // queryMode === QueryMode.InitialLoad
        setHasPrevPage(false);
        setHasNextPage(hasMore);
      }

      const docsData: QuestionListItemProps[] = currentDocs.map(
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
            onDelete: async () => {
              if (
                window.confirm(
                  "Are you sure you want to delete this question? This cannot be undone."
                )
              ) {
                await collectionRef.doc(qid).delete();

                toast.info(
                  <div>
                    Deleted question <code>{qid}</code>
                  </div>
                );
              }
            },
          };
        }
      );

      setQuestionListItems(docsData);
      setStatus("success");
    });
  };

  useEffect(() => {
    queryDocs();
  }, [query]);

  const toPrevPage = () => {
    setQueryMode(QueryMode.ToPrevPage);
    setQuery(
      collectionRef
        .orderBy("updatedAt", "desc")
        .endBefore(firstDoc)
        .limitToLast(pageSize + 1)
    );
  };

  const toNextPage = () => {
    setQueryMode(QueryMode.ToNextPage);
    setQuery(
      collectionRef
        .orderBy("updatedAt", "desc")
        .startAfter(lastDoc)
        .limit(pageSize + 1)
    );
  };

  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        {status === "loading" ? (
          <Container>
            <Row>
              <Col>Loading...</Col>
            </Row>
          </Container>
        ) : (
          <main className={styles.page}>
            <Container>
              <Row>
                <Col>
                  <h2 className="sectionTitle grayBottomBorder">
                    Coding Questions
                    <span className="accent pink" />
                  </h2>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link href="/coding-question/new">
                    <a className={styles.createButton}>+ Create</a>
                  </Link>
                </Col>
              </Row>

              <QuestionList items={questionListItems} />

              <Row>
                <Col md={6}>
                  {hasPrevPage && <div onClick={toPrevPage}>Prev</div>}
                </Col>
                <Col md={6}>
                  {hasNextPage && <div onClick={toNextPage}>Next</div>}
                </Col>
              </Row>
            </Container>
          </main>
        )}
      </AuthCheck>
    </Layout>
  );
}
