import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseCalendar from "components/calendar/CourseCalendar";
import styles from "styles/pages/schedule.module.scss";

export default function SchedulePage() {
  return (
    <Layout>
      <main className={styles.schedulePage}>
        <Container fluid>
          <Row>
            <Col>
              <h1 className="pageTitle">Course Calendar</h1>
            </Col>
          </Row>
        </Container>

        <CourseCalendar />
      </main>
    </Layout>
  );
}
