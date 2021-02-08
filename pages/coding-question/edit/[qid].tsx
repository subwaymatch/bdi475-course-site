import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { Container, Row, Col } from "react-bootstrap";
import ICodingQuestion from "typings/coding-question";
import _ from "lodash";
import randomstring from "randomstring";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;
  const firestore = useFirestore();
  const docRef = firestore.collection("codingQuestions").doc(qid as string);
  const {
    status,
    data,
  }: { status: string; data: ICodingQuestion } = useFirestoreDocData(docRef);

  const onDelete = async () => {
    await docRef.delete();

    router.push("/coding-question/list");
  };

  const onClone = async (v) => {
    const clonedDocRef = await firestore
      .collection("codingQuestions")
      .doc(randomstring.generate(6));

    const clonedData = Object.assign({}, _.cloneDeep(v), {
      title: v.title + " (Clone)",
    });

    await clonedDocRef.set(clonedData);

    router.push(`/coding-question/edit/${clonedDocRef.id}`);
  };

  const saveDoc = async (v) => {
    await docRef.set(v, { merge: true });
  };

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
        qid={docRef.id}
        savedData={_.omit(data, "NO_ID_FIELD")}
        onSave={(newData) => {
          saveDoc(newData);
        }}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}
