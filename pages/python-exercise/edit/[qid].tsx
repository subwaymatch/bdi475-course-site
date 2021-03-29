import PythonExerciseEditor from "components/python-exercise/PythonExerciseEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { Container, Row, Col } from "react-bootstrap";
import IPythonExercise from "typings/coding-exercise";
import _ from "lodash";
import { generateQuestionId } from "utils/question";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { qid } = router.query;
  const firestore = useFirestore();
  const docRef = firestore.collection("codingQuestions").doc(qid as string);
  const {
    status,
    data,
  }: { status: string; data: IPythonExercise } = useFirestoreDocData(docRef);

  const onDelete = async () => {
    await docRef.delete();

    router.push("/python-exercise/list");
  };

  const onClone = async (v) => {
    const clonedDocRef = await firestore
      .collection("codingQuestions")
      .doc(generateQuestionId());

    const clonedData = Object.assign({}, _.cloneDeep(v), {
      title: v.title + " (Clone)",
    });

    await clonedDocRef.set(clonedData);

    router.push(`/python-exercise/edit/${clonedDocRef.id}`);
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
      <PythonExerciseEditor
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
