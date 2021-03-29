import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import Image from "next/image";
import clsx from "clsx";
import RecordedPythonExercise from "components/common/RecordedPythonExercise";

export default function VariablesAndDataTypesPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Variables and Data Types
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <Row className={styles.listBox}>
            <Col md={4}>
              <h3>Objectives ⟶</h3>
            </Col>

            <Col md={8}>
              <ul>
                <li>
                  Understand what{" "}
                  <span className="color-purple">variables</span> are.
                </li>
                <li>Why do we need variables?</li>
                <li>
                  What are <span className="color-green">data types</span>?
                </li>
                <li>Understand basic data types.</li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612358691500.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              lg={{
                span: 6,
                offset: 3,
              }}
              md={{
                span: 8,
                offset: 2,
              }}
            >
              <div className={styles.textBox}>
                <h3>What are variables?</h3>

                <span className="label blue">From Wikipedia</span>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#777",
                  }}
                >
                  A variable is a storage location (identified by a memory
                  address) paired with an associated symbolic name, which
                  contains some known or unknown quantity of information
                  referred to as a value.
                </p>

                <span className="label pink">What it really means</span>
                <p>
                  A variable is a nickname for a stored value that can{" "}
                  <em className="color-pink">change</em>.
                </p>
              </div>
            </Col>
          </Row>

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Python Variable Naming Rules
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">First Character</span>

                    <p>
                      Variable names must{" "}
                      <span className="color-blue">
                        begin with a letter or an underscore
                      </span>
                      .
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Allowed Characters</span>

                    <p>
                      You can use{" "}
                      <span className="color-blue">
                        letters, numbers, and underscores
                      </span>{" "}
                      for the remainder of your variable name.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Case Matters</span>

                    <p>
                      Variable names are{" "}
                      <span className="color-pink">case-sensitive</span>.<br />
                      <code>my_var</code>, <code>MY_VAR</code>,{" "}
                      <code>My_Var</code> are all separate variables.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonExercise
            qid="F7EJVQ"
            className={styles.questionWrapper}
          />
        </Container>
      </main>
    </Layout>
  );
}
