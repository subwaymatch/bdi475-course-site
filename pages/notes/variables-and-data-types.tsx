import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import Image from "next/image";
import clsx from "clsx";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

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
                  What are <span className="color-green">data types</span>?
                </li>
                <li>Understand basic data types.</li>
                <li>
                  Understand what{" "}
                  <span className="color-purple">variables</span> are.
                </li>
                <li>Why do we need variables?</li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1630532795833.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge challengeId={6} className={styles.block} />

          <RecordedPythonChallenge challengeId={152} className={styles.block} />

          <RecordedPythonChallenge challengeId={154} className={styles.block} />

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
                <h3>Python Data Types</h3>

                <span className="label purple">What is it?</span>
                <p>
                  In Python, ALL values have{" "}
                  <span className="color-purple">data types</span>. We'll go
                  over the few <strong>built-in</strong> types.
                  <ul>
                    <li>
                      <code>Text "Hello World"</code> is a text type (
                      <code>str</code>).
                    </li>
                    <li>
                      Number <code>475</code> is an integer type (
                      <code>int</code>
                      ).
                    </li>
                    <li>
                      Number <code>1.99</code> is a float type (
                      <code>float</code>).
                    </li>
                    <li>
                      Logical <code>True</code> is a boolean type (
                      <code>bool</code>).
                    </li>
                  </ul>
                </p>

                <span className="label green">Primitive vs Non-primitive</span>
                <p>
                  Data types can be categorized into two types -{" "}
                  <em className="color-green">primitive</em> and{" "}
                  <em className="color-green">non-primitive</em> types.
                  Technically speaking, Python only has <em>non-primitive</em>{" "}
                  types as everything is an object in Python. For the purpose of
                  this course, you do not have to worry about differentiating
                  between primitive and non-primitive types.
                </p>
              </div>
            </Col>
          </Row>

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Basic Data Types
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Text</span>

                    <p>
                      Strings (<code>str</code>) are text types. They are always
                      enclosed in single or double quotes.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Numbers</span>

                    <p>
                      Integers (<code>int</code>) and decimals (
                      <code>float</code> are numeric types. There is also
                      another numeric type (<code>complex</code>) that we won't
                      talk about.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Logical Yes/No</span>

                    <p>
                      Booleans (<code>bool</code>) can only have two possible
                      values - <code>True</code> or <code>False</code>.
                      Technically speaking, booleans are a subtype of integers.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonChallenge challengeId={151} className={styles.block} />

          <RecordedPythonChallenge challengeId={153} className={styles.block} />

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

                <span className="label green">Creating a Variable</span>
                <p>
                  The syntax to create a new variable is{" "}
                  <code>my_variable = some_value</code>. The <code>=</code>{" "}
                  symbol here is an <strong>assignment operator</strong> and NOT
                  a symbol for equality.
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

          <RecordedPythonChallenge challengeId={13} className={styles.block} />

          <RecordedPythonChallenge challengeId={155} className={styles.block} />

          <RecordedPythonChallenge challengeId={156} className={styles.block} />

          <RecordedPythonChallenge challengeId={157} className={styles.block} />

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
                <h3>Updating Variables</h3>

                <span className="label blue">Too Easy</span>
                <p>
                  The syntax for updating a variable is{" "}
                  <strong>the same as creating a new variable</strong>.
                </p>

                <p>
                  <code>my_variable = updated_value</code>
                </p>
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge challengeId={158} className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
