import Link from "next/link";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/NotesPage.module.scss";
import Image from "next/image";

export default function NotesPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Lecture Notes</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="sectionTitle">
                Python Basics <span className="purple accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={6}>
              <Link href="/notes/variables-and-data-types">
                <a className={styles.noteItem}>
                  <Image
                    src="/images/notes-thumbnail/1612327404248.png"
                    width={4860}
                    height={3240}
                    alt=""
                  />

                  <h3>Variables and Data Types</h3>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
