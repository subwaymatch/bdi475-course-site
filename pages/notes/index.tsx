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
                    src="/images/notes/1612359825610.png"
                    width={900}
                    height={600}
                    alt=""
                  />
                  <h3>Variables and Data Types</h3>
                </a>
              </Link>
            </Col>

            <Col md={4} sm={6}>
              <Link href="/notes/booleans-and-conditional-logic">
                <a className={styles.noteItem}>
                  <Image
                    src="/images/notes/1612360485433.png"
                    width={900}
                    height={600}
                    alt=""
                  />
                  <h3>Booleans and Conditional Logic</h3>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
