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
              "Create a variable named first_name with your first name as the value. Note that your name should be enclosed in either single quotes (') or double quotes(\")."
            }
            starterCode={"print('Hello World')"}
          />
        </Container>
      </main>
    </Layout>
  );
}
