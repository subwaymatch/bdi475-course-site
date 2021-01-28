import { useState, useEffect } from "react";
import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestoreDocDataOnce, useFirestore } from "reactfire";
import { Container, Row, Col } from "react-bootstrap";
import { ICodingQuestion } from "typings/coding-question";

export default function EditCodingQuestionPage(props) {
  const router = useRouter();
  const { qid } = router.query;

  const [codingQuestion, setCodingQuestion] = useState<ICodingQuestion>({
    title: "",
    textMarkdown: "",
    starterCode: "",
    solutionCode: "",
    testCode: "",
  });

  const docRef = useFirestore()
    .collection("codingQuestions")
    .doc(qid as string);

  const { status, data } = useFirestoreDocDataOnce(docRef);

  console.log(props);
  return (status as any) === "loading" ? (
    <Layout>
      <Container>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </Container>
    </Layout>
  ) : (
    <Layout excludeHeader={true}>
      <QuestionEditor />
    </Layout>
  );
}
