import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce,
} from "reactfire";
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
    try {
      const result = await docRef.delete();

      console.log(`delete qid=${qid}, result=${result}`);

      router.push("/coding-question/list");
    } catch (err) {
      throw err;
    }
  };

  const onClone = async (v) => {
    try {
      const clonedDocRef = await firestore
        .collection("codingQuestions")
        .doc(randomstring.generate(6));

      const clonedData = Object.assign({}, _.cloneDeep(v), {
        title: v.title + " (Clone)",
      });

      await clonedDocRef.set(clonedData);

      router.push(`/coding-question/edit/${clonedDocRef.id}`);
    } catch (err) {
      throw err;
    }
  };

  const saveDoc = async (v) => {
    try {
      const result = await docRef.set(v);
      console.log(`save qid=${qid}, result=${result}`);
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
        qid={qid as string}
        savedData={_.omit(data, "NO_ID_FIELD")}
        onSave={(newData) => {
          console.log(`onSave, newValue`);
          console.log(newData);
          saveDoc(newData);
        }}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}
