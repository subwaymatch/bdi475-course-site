import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import thumbImage from "public/images/notes/abstract-002.png";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import { FaWikipediaW } from "react-icons/fa";
import LargeQuote from "components/common/LargeQuote";
import Chip from "components/common/Chip";
import RecordedMultipleChoiceQuestionById from "components/common/RecordedMultipleChoiceQuestionById";

export default function BooleansAndConditionalsPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>
                Operators, Booleans, and Conditionals
              </h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>Discuss operators.</>,
              <>
                Understand the <code>bool</code> data type.
              </>,
              <>Understand why booleans are important in programming.</>,
              <>
                Discuss the <span className="color-purple">operators</span> that
                return boolean values.
              </>,
              <>
                Understand <code>if</code>/<code>else</code> statements.
              </>,
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
            <h2>Operators</h2>

            <Chip color="blue">What are they?</Chip>

            <p>
              Operators are symbols that perform various types of opertions. The
              most simple example is an addition (e.g., <code>1 + 1</code>),
              which performs an arithmetic operation.
            </p>

            <p>Python operations are categorized into the following groups:</p>

            <ul>
              <li>Arithmetic Operators</li>
              <li>Assignment Operators</li>
              <li>Comparison Operators</li>
              <li>Logical Operators</li>
              <li>Bitwise Operators</li>
              <li>Membership Operators</li>
              <li>Identity Operators</li>
            </ul>

            <h3>Arithmetic Operators</h3>
          </CenteredColumn>

          <RecordedMultipleChoiceQuestionById
            questionId={32}
            className={styles.block}
          />

          <RecordedMultipleChoiceQuestionById
            questionId={33}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h2>Booleans</h2>

            <Chip color="purple">Overview</Chip>

            <p>
              A <strong>boolean</strong> is a data type that can only represent
              two possible values - <code>True</code> or <code>False</code>. The
              name boolean originates from the English mathematician George
              Boole.
            </p>
            <p>
              Although having only two possible values makes booleans look
              trivial, booleans will end up playing a critical role in writing
              your code.
            </p>
            <p>
              A boolean <code>True</code> is NOT the same as a string{" "}
              <code>"True"</code> (note the double quotes around the text in
              string <code>"True"</code>).
            </p>
          </CenteredColumn>

          <LargeQuote className={styles.block}>
            <p>
              Will you marry me? <br className="d-none d-md-inline" />
              Heck{" "}
              <span
                style={{
                  color: "#aaa",
                  textDecoration: "line-through",
                }}
              >
                yes
              </span>{" "}
              <span className="color-green">True</span>! I'll marry you.
            </p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={10}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={8}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={9}
            className={styles.block}
          />

          <Row className={clsx(styles.boxItems)}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="sectionTitle">
                Why are booleans so important?
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={6}>
                  <div className={styles.item}>
                    <Chip color="blue">Evaluation</Chip>

                    <p>
                      Even the most complex boolean <em>expressions</em> in
                      programming eventually boils down to a single boolean
                      value.
                    </p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className={styles.item}>
                    <Chip color="blue">Logic</Chip>

                    <p>
                      It controls the <em>flow</em> of your program. We will
                      soon see how <code>if</code> statements can conditionally
                      run some code.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <LargeQuote className={styles.block}>
            <p>
              If I have over $100 in my wallet, I will go grab a Ribeye steak.
            </p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={23}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={159}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={160}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Expressions</h3>

            <Chip color="purple">Evaluated Chunk of Code</Chip>

            <p>
              If you're new to programming, an{" "}
              <span className="color-blue">expression</span> may mean the look
              on your face, or a group of words used to signal how you feel.
            </p>
            <p>
              In the context of <strong>mathematics</strong>, an expression is{" "}
              <span className="color-pink">
                a combination of symbols that is well-formed according to the
                rules
              </span>{" "}
              that depend on the context (thank you <FaWikipediaW /> Wikipedia).
            </p>

            <Chip color="green">For Us</Chip>
            <p>
              In the context of <strong>programming</strong>, an expression is{" "}
              <span className="color-green">
                a unit of code that can be evaluated to determine its value
              </span>
              . This definition does not deviate far away from that of
              mathematics. We'll come back to how math and programming are
              intertwined.
            </p>

            <p>
              A <span className="color-green">boolean expression</span> is any
              expression that evaluates to either <code>True</code> or{" "}
              <code>False</code>.
            </p>
          </CenteredColumn>

          <ListWithTitle
            title="Examples of Expressions ⟶"
            items={[
              <>
                <code>1 + 1</code> is an expression that evaluates to{" "}
                <code>2</code>.
              </>,
              <>
                <code>575 &gt; 500</code> is an expression that evaluates to{" "}
                <code>True</code>.
              </>,
              <>
                <code>"Five" + "Guys"</code> is an expression that evaluates to{" "}
                <code>"FiveGuys"</code>.
              </>,
              <>
                <code>hometown == "Taipei"</code> is an expression that
                evaluates to either <code>True</code>
                or <code>False</code> depending on the value of the{" "}
                <code>hometown</code> variable.
              </>,
              <>
                <code>True</code> is an expression too.
              </>,
              <>
                And yes, <code>1</code> is another expression.{" "}
                <em>Constants</em> themselves are expressions.
              </>,
            ]}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={5}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={161}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={36}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>If...Else</h3>
            <Chip color="green">Conditional Blocks</Chip>
            <p>
              Being able to use expressions to dynamically determine a value
              sounds... fancy. But how exactly is it <em>useful</em>?
            </p>
            <p>
              This is where the{" "}
              <span className="color-green">conditional statements</span> shine.
              Conditional statements allow your code to make decisions based on
              rules.
            </p>
          </CenteredColumn>

          <LargeQuote className={styles.block}>
            <p>
              If I can't afford a Ribeye steak, I'm heading to Panda Express.
            </p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={3}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={162}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={163}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Why are some lines indented?</h3>
            <Chip color="green">Code Blocks</Chip>
            <p>
              Python uses indentation to define a block of code. What do you
              mean block of code? A block of code refers to{" "}
              <span className="color-purple">
                one or more lines of code that belong to if/elif/else
                statements, a function, or a loop.
              </span>
            </p>
            <p>
              You can use however many spaces you want. However, you must be{" "}
              <strong>consistent</strong> in the number of spaces you use.
              Python will throw an error if you mix the number of spaces used
              for indentation.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={33}
            className={styles.block}
          />

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Conditional Statements
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="green">if</Chip>

                    <p>
                      <code>if</code> statements always come first. You must
                      specify a condition here (<code>if cash &gt; 100</code>).
                      An <code>if</code> block is required before you use{" "}
                      <code>elif</code> or <code>else</code>. You can only have
                      one <code>if</code> statment in a set of{" "}
                      <code>if/elif/else</code> statements.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="yellow">elif</Chip>

                    <p>
                      <code>elif</code> statements come after the first
                      <code>if</code> block. Similar to <code>if</code>{" "}
                      statements, you must specify a condition for{" "}
                      <code>elif</code> statements. You can have as many{" "}
                      <code>elif</code> blocks as you'd like.
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="pink">else</Chip>

                    <p>
                      <code>else</code> statements come last. <code>else</code>{" "}
                      statements caputure <strong>any</strong> cases that are
                      not satisfied by the preceding <code>if/elif</code>{" "}
                      statements.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <LargeQuote className={styles.block}>
            <p>How does Biaggis sound?</p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={25}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={27}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={164}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={165}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={166}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
