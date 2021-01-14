import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";
import CourseCalendar from "components/pages/schedule/CourseCalendar";

export default function SchedulePage() {
  return (
    <Layout>
      <Header />

      <Container>
        <Row>
          <Col>
            <h1 className="pageTitle">Course Calendar</h1>
          </Col>
        </Row>
      </Container>

      <CourseCalendar />
    </Layout>
  );
}
