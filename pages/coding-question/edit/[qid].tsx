import QuestionEditor from "components/coding-question/QuestionEditor";
import Layout from "components/Layout";

export default function EditCodingQuestionPage(props) {
  console.log(props);
  return (
    <Layout excludeHeader={true}>
      <QuestionEditor />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(context.params);

  // Fetch question data from the server
  const data = {
    // id: questionId,
    initialTitle: "",
    initialStarter: "# Starter code",
    initialSolution: "# Solution",
    initialTestCode: "# Test Cases",
  };

  return {
    props: data,
  };
}
