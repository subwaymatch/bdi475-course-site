import Layout from "components/Layout";
import CodingQuestion from "components/coding-question/CodingQuestion";
import styles from "styles/pages/coding-question/CodingQuestionPage.module.scss";
import { Container } from "react-bootstrap";

export default function EditCodingQuestionPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <CodingQuestion
            title={"Update a variable"}
            textMarkdown={
              "Can you retrieve and print out the number of languages Vrushita speaks from the candidate dictionary? For example, if Vrushita speaks only one language, your printed output should be 3."
            }
            starterCode={"print('Hello World')"}
            testCode={"tc.assertEqual(3, 3)"}
          />
        </Container>
      </main>
    </Layout>
  );
}
