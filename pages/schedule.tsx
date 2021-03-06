import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseCalendar from "components/pages/schedule/CourseCalendar";
import styles from "styles/pages/schedule.module.scss";

export default function SchedulePage() {
  return (
    <Layout hideSideFloatingBars={true}>
      <main className={styles.schedulePage}>
        <Container>
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
