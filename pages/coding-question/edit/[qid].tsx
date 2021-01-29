import { useState, useEffect } from "react";
import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestoreDocDataOnce, useFirestore } from "reactfire";
import { Container, Row, Col } from "react-bootstrap";
import ICodingQuestion from "typings/coding-question";

export default function EditCodingQuestionPage(props) {
  const router = useRouter();
  const { qid } = router.query;

  const docRef = useFirestore()
    .collection("codingQuestions")
    .doc(qid as string);

  const {
    status,
    data,
  }: { status: string; data: ICodingQuestion } = useFirestoreDocDataOnce(
    docRef
  );

  console.log(props);
  return (status as any) === "loading" ? (
    <Layout excludeHeader={true}>
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    </Layout>
  ) : (
    <Layout excludeHeader={true}>
      <QuestionEditor
        codingQuestion={data}
        onSave={(v) => {
          console.log(`onSave, newValue`);
          console.log(v);
        }}
      />
    </Layout>
  );
}
