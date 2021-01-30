import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { Container, Row, Col } from "react-bootstrap";
import ICodingQuestion from "typings/coding-question";
import _ from "lodash";

export default function EditCodingQuestionPage() {
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

  const saveDoc = async (v) => {
    try {
      const result = await docRef.set(v);
      console.log(`save result=${result}`);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(`data`);
  console.log(data);

  return status === "loading" ? (
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
        initial={_.omit(data, "NO_ID_FIELD")}
        onSave={(newData) => {
          console.log(`onSave, newValue`);
          console.log(newData);
          saveDoc(newData);
        }}
      />
    </Layout>
  );
}
