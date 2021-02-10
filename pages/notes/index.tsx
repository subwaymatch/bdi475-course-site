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
            <Col lg={4} md={6}>
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

            <Col lg={4} md={6}>
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

            <Col lg={4} md={6}>
              <Link href="/notes/lists-and-loops">
                <a className={styles.noteItem}>
                  <Image
                    src="/images/notes/1612807284318.png"
                    width={900}
                    height={600}
                    alt=""
                  />
                  <h3>Lists and Loops</h3>
                </a>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={6}>
              <Link href="/notes/while-loops-and-collections">
                <a className={styles.noteItem}>
                  <Image
                    src="/images/notes/1612973757417.png"
                    width={900}
                    height={600}
                    alt=""
                  />
                  <h3>While Loops and Collections</h3>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
