import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import Image from "next/image";
import thumbImage from "public/images/notes/abstract-001.png";
import clsx from "clsx";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import CenteredColumn from "components/common/CenteredColumn";
import ListWithTitle from "components/common/ListWithTitle";
import RecordedMultipleChoiceQuestionById from "components/common/RecordedMultipleChoiceQuestionById";
import Chip from "components/common/Chip";

export default function VariablesAndDataTypesPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Variables and Data Types</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives"
            items={[
              <>Introduce you to Python.</>,
              <>
                Understand what a <span className="color-blue">data type</span>{" "}
                is.
              </>,
              <>Discuss basic data types.</>,
              <>
                Understand what <span className="color-blue">variables</span>{" "}
                are.
              </>,
              <>Discuss why variables are useful.</>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image src={thumbImage} alt="" />
              </div>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h2>What is Python?</h2>

            <p>
              Python is a <span className="color-purple">broad-purpose</span>{" "}
              programming language that is designed to be{" "}
              <span className="color-purple">human-readable</span>. It was
              created by Guido van Rossum in the 1980s. Its simple syntax
              emphasizes readability. Unlike many other programming languages,
              Python code often reads like natural English sentences. According
              to{" "}
              <a
                href="https://pypl.github.io/PYPL.html"
                title="PYPL PopularitY of Programming Language"
              >
                PYPL Programming Language Popularity Index
              </a>
              , Python is the world's most popular programming language.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Change</th>
                  <th>Language</th>
                  <th>Share</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td>
                    <strong className="color-blue">Python</strong>
                  </td>
                  <td>28.74%</td>
                  <td>-1.80%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td>Java</td>
                  <td>18.01%</td>
                  <td>1.20%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td>JavaScript</td>
                  <td>9.07%</td>
                  <td>0.60%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <span className="color-green">↑</span>
                  </td>
                  <td>C/C++</td>
                  <td>7.40%</td>
                  <td>1.10%</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    {" "}
                    <span className="color-red">↓</span>
                  </td>
                  <td>C#</td>
                  <td>7.27%</td>
                  <td>0.70%</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td></td>
                  <td>PHP</td>
                  <td>6.06%</td>
                  <td>0.00%</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td></td>
                  <td>R</td>
                  <td>4.19%</td>
                  <td>0.30%</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td></td>
                  <td>Objective-C</td>
                  <td>2.27%</td>
                  <td>-1.40%</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td></td>
                  <td>Swift</td>
                  <td>1.91%</td>
                  <td>-0.20%</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td></td>
                  <td>TypeScript</td>
                  <td>1.74%</td>
                  <td>0.00%</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ marginTop: "4rem" }}>
              What makes Python so charming?
            </h3>

            <ol>
              <li>It's easy to read and write.</li>
              <li>It's open-source and free.</li>
              <li>
                There are thousdands of <em>packages</em> available.
              </li>
              <li>
                It's versatile. You can use Python for data science (machine
                learning, deep learning, AI), web development, desktop app
                development, low-level programs, game programming, and more.
              </li>
              <li>It has a massive community of users and supporters.</li>
            </ol>
          </CenteredColumn>

          <Row className={styles.boxItems}>
            <Col>
              <h2 className="sectionTitle">
                Why Python
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip label="Perfect for Beginners" />

                    <p>Human-readable</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip label="Community" />

                    <p>
                      Thousands of <a href="https://pypi.org/">packages</a>
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip label="Versatile" />

                    <p>Popular for data analytics/science</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={252}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={152}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={154}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h2>Python Data Types</h2>

            <Chip color="purple">What is it?</Chip>

            <p>
              A data type denotes the category of a value. In Python, ALL values
              have <em>data type</em>s. We'll go over a few{" "}
              <strong>built-in</strong> types. Built-in types are pre-defined
              data types that are part of the Python programming language
              itself.
            </p>

            <ul>
              <li>
                Text <code>"Hello World"</code> is a text type (<code>str</code>
                ).
              </li>
              <li>
                Number <code>475</code> is an integer type (<code>int</code>
                ).
              </li>
              <li>
                Number <code>1.99</code> is a float type (<code>float</code>
                ).
              </li>
              <li>
                Logical <code>True</code> is a boolean type (<code>bool</code>).
              </li>
            </ul>

            <Chip color="green">Primitive vs Non-primitive</Chip>
            <p>
              Data types can be categorized into two types -{" "}
              <em className="color-green">primitive</em> and{" "}
              <em className="color-green">non-primitive</em> types. Technically
              speaking, Python only has <em>non-primitive</em> types as
              everything is an object in Python. For the purpose of this course,
              you do not have to worry about differentiating between primitive
              and non-primitive types.
            </p>
          </CenteredColumn>

          <Row className={styles.boxItems}>
            <Col>
              <h2 className="sectionTitle">
                Basic Data Types
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="blue">Text</Chip>

                    <p>
                      Strings (<code>str</code>) are text types. They are always
                      enclosed in single or double quotes.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="blue">Numbers</Chip>

                    <p>
                      Integers (<code>int</code>) and decimals (
                      <code>float</code>) are numeric types. There is also
                      another numeric type (<code>complex</code>) that we won't
                      talk about.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="blue">Logical Yes/No</Chip>

                    <p>
                      Booleans (<code>bool</code>) can only have two possible
                      values - <code>True</code> or <code>False</code>. Note
                      that <code>"True"</code> is a string type since it's
                      inclosed in double quotes. Boolean values should not be
                      enclosed in quotes.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedMultipleChoiceQuestionById
            questionId={27}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={151}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={153}
            className={styles.block}
          />

          <RecordedMultipleChoiceQuestionById
            questionId={28}
            className={styles.block}
          />

          <RecordedMultipleChoiceQuestionById
            questionId={29}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={253}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>What are variables?</h3>

            <Chip color="blue">From Wikipedia</Chip>
            <p
              style={{
                textDecoration: "line-through",
                color: "#777",
              }}
            >
              A variable is a storage location (identified by a memory address)
              paired with an associated symbolic name, which contains some known
              or unknown quantity of information referred to as a value.
            </p>

            <Chip color="pink">What it really means</Chip>
            <p>
              A variable is a nickname for a stored value that can{" "}
              <em className="color-pink">change</em>.
            </p>

            <Chip color="green">Why do we use variables?</Chip>
            <p>
              If you have a constantly-changing value that is used in many
              different places of a computer program, you will likely run into a
              maintenance issue as you have to manually update those values
              every time the value changes. If you create a variable and
              reference that variable instead, you only have to update that
              variable instead of having to update every occurrence.
            </p>

            <p>
              Variables also increase the readability if properly used. Assume
              that you are calculating the after-tax price (at a tax rate of
              10%) of an item that is 2 dollars. In Python code, the calculation
              of the after-tax price can be written as <code>2 * 1.10</code>.
              Although you may understand what the numbers in{" "}
              <code>2 * 1.10</code> mean, but other people may have a difficult
              time understanding it. Rewriting it to{" "}
              <code>before_tax_price * (1 + tax_rate)</code> improves the
              readability of your code.
            </p>

            <Chip color="purple">Creating a Variable</Chip>
            <p>
              The syntax to create a new variable is{" "}
              <code>my_variable = some_value</code>. The <code>=</code> symbol
              here is an <strong>assignment operator</strong>, NOT a symbol for
              equality.
            </p>
          </CenteredColumn>

          <RecordedMultipleChoiceQuestionById
            questionId={30}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={254}
            className={styles.block}
          />

          <RecordedMultipleChoiceQuestionById
            questionId={31}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={255}
            className={styles.block}
          />

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Python Variable Naming Rules
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip>First Character</Chip>

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
                    <Chip>Allowed Characters</Chip>

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
                    <Chip>Case Matters</Chip>

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

          <RecordedPythonChallengeById
            challengeId={156}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={157}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Updating Variables</h3>

            <Chip color="blue">Identical</Chip>
            <p>
              The syntax for updating a variable is{" "}
              <strong>the same as creating a new variable</strong>.
            </p>

            <p>
              <code>my_variable = updated_value</code>
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={158}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
