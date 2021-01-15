import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import CourseInformation from "components/pages/syllabus/CourseInformation";
import GradingBreakdown from "components/pages/syllabus/GradingBreakdown";

export default function SyllabusPage() {
  return (
    <Layout>
      <Header />

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Syllabus</h1>
            </Col>
          </Row>
        </Container>

        <CourseInformation />

        <GradingBreakdown />
      </main>
    </Layout>
  );
}
