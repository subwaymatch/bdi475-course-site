import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import CourseInformation from "components/pages/syllabus/CourseInformation";
import GradingBreakdown from "components/pages/syllabus/GradingBreakdown";
import Participation from "components/pages/syllabus/Participation";
import styles from "styles/pages/syllabus.module.scss";

export default function SyllabusPage() {
  return (
    <Layout>
      <main className={styles.syllabusPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Syllabus</h1>
            </Col>
          </Row>
        </Container>

        <CourseInformation />

        <GradingBreakdown />

        <Participation />
      </main>
    </Layout>
  );
}
