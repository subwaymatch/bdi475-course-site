import Layout from "components/Layout";
import CodingQuestion from "components/coding-question/CodingQuestion";
import styles from "styles/pages/coding-question/EditCodingQuestionPage.module.scss";
import { Col, Container, Row } from "react-bootstrap";

export default function EditCodingQuestionPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <CodingQuestion />
        </Container>
      </main>
    </Layout>
  );
}
