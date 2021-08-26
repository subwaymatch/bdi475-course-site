import PythonExerciseEditor from "components/python-exercise/PythonExerciseEditor";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { supabaseClient } from "lib/supabase/supabaseClient";
import IPythonExercise from "typings/coding-exercise";
import _ from "lodash";
import { generateQuestionId } from "utils/question";
import { useEffect, useState } from "react";
import { useUser } from "context/UserContext";

export default function EditCodingQuestionPage() {
  const router = useRouter();
  const { user, roles } = useUser();
  const { qid } = router.query;
  const [questionData, setQuestionData] = useState<IPythonExercise>({
    title: null,
    textMarkdown: null,
    starterCode: null,
    testCode: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [solutionCode, setSolutionCode] = useState("");

  const loadQuestionData = async () => {
    const { data: questionData, error: questionError } = await supabaseClient
      .from("coding_questions")
      .select()
      .eq("id", qid)
      .single();

    const { data: solutionData, error: solutionError } = await supabaseClient
      .from("coding_question_solutions")
      .select()
      .eq("qid", qid)
      .single();

    console.log(`solutionData`);
    console.log(solutionData);

    setQuestionData({
      title: questionData.title,
      textMarkdown: questionData.text_markdown,
      starterCode: questionData.starter_code,
      testCode: questionData.test_code,
    });
    setSolutionCode(solutionData.solution_code);

    setIsLoading(false);
  };

  const onDelete = async () => {
    const { data, error } = await supabaseClient
      .from("coding_questions")
      .delete()
      .match({ id: qid });

    router.push("/python-exercise/list");
  };

  const onClone = async (v) => {
    // const clonedDocRef = await firestore
    //   .collection("codingQuestions")
    //   .doc(generateQuestionId());
    // const clonedData = Object.assign({}, _.cloneDeep(v), {
    //   title: v.title + " (Clone)",
    // });
    // await clonedDocRef.set(clonedData);
    // router.push(`/python-exercise/edit/${clonedDocRef.id}`);
  };

  const saveQuestionData = async (v) => {
    // await docRef.set(v, { merge: true });
  };

  const saveSolutionCode = async (solutionCode) => {};

  useEffect(() => {
    if (!qid || !user) {
      return;
    }

    loadQuestionData();
  }, [qid, user, roles]);

  return isLoading ? (
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
        qid={qid as string}
        questionData={questionData}
        solutionCode={solutionCode}
        onSave={(questionData, solutionCode) => {
          saveQuestionData(questionData);
          saveSolutionCode(solutionCode);
        }}
        onClone={onClone}
        onDelete={onDelete}
      />
    </Layout>
  );
}
