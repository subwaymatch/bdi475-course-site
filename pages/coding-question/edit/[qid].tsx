import { useState, useEffect } from "react";
import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useFirestoreDocData, useFirestore } from "reactfire";

export default function EditCodingQuestionPage(props) {
  const router = useRouter();
  const { qid } = router.query;

  const [title, setTitle] = useState("");
  const [textMarkdown, setTextMarkdown] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [testCode, setTestCode] = useState("");

  const docRef = useFirestore()
    .collection("codingQuestions")
    .doc(qid as string);

  const { status, data } = useFirestoreDocData(docRef);

  console.log(props);
  return (
    <Layout excludeHeader={true}>
      <QuestionEditor />
    </Layout>
  );
}
