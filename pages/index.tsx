import Layout from "components/Layout";
import Header from "components/Header";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
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

          <Row>
            <Col>
              <h2 className="sectionTitle">Announcements</h2>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
