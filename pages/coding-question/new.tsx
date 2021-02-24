import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { generateQuestionId } from "utils/question";

export default function NewCodingQuestionPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/coding-question/edit/${generateQuestionId()}`);
  });

  return (
    <Layout excludeHeader={true}>
      <Container>
        <Row>
          <Col>Creating...</Col>
        </Row>
      </Container>
    </Layout>
  );
}
