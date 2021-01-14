import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import CourseInformation from "components/pages/syllabus/CourseInformation";
import GradeBreakdown from "components/pages/syllabus/GradeBreakdown";

export default function SyllabusPage() {
  return (
    <Layout>
      <Header />

      <main>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">
                Introduction to Data Analytics Applications in Business
              </h1>
            </Col>
          </Row>
        </Container>

        <CourseInformation />

        <GradeBreakdown />
      </main>
    </Layout>
  );
}
