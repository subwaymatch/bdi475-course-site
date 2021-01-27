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
            title={"Playground"}
            textMarkdown={
              "Welcome back to BDI 475 😀! Write code on the right and click on the run button at the bottom right to run your code."
            }
            starterCode={"print('Hello World')"}
            testCode={"tc.assertEqual(3, 3)"}
          />
        </Container>
      </main>
    </Layout>
  );
}
