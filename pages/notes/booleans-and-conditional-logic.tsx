import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonExercise from "components/common/RecordedPythonExercise";
import { FaWikipediaW } from "react-icons/fa";
import LargeQuote from "components/common/LargeQuote";

export default function BooleanAndConditionalLogicPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Booleans and Conditional Logic
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Understand the <code>bool</code> data type.
              </>,
              <>Why are booleans so important in programming?</>,
              <>
                Discuss the <span className="color-purple">operators</span> that
                return boolean values.
              </>,
              <>
                Understand <code>if</code>/<code>else</code> statements.
              </>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612360567295.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h3>What are booleans?</h3>

            <span className="label purple">Overview</span>

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
                className="color-green"
                style={{
                  textDecoration: "line-through",
                }}
              >
                yes
              </span>{" "}
              True! I'll marry you.
            </p>
          </LargeQuote>

          <RecordedPythonExercise qid="c6NgwO" className={styles.block} />

          <RecordedPythonExercise qid="CyHuSl" className={styles.block} />

          <RecordedPythonExercise qid="D0o7hU" className={styles.block} />

          <Row className={clsx(styles.boxItems)}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="sectionTitle">
                Why are booleans so important?
                <span className="accent purple" />
              </h2>

              <Row>
                <Col md={6}>
                  <div className={styles.item}>
                    <span className="label yellow">Evaluation</span>

                    <p>
                      Even the most complex boolean <em>expressions</em> in
                      programming eventually boils down to a single boolean
                      value.
                    </p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className={styles.item}>
                    <span className="label green">Logic</span>

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
              If I have over $100 in my wallet, I will go grab a full Peking
              Duck.
            </p>
          </LargeQuote>

          <RecordedPythonExercise qid="X0ekJl" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Boolean Expressions</h3>

            <span className="label purple">Yes or No</span>

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
            <p>
              In the context of <strong>programming</strong>, an expression is{" "}
              <span className="color-pink">
                a unit of code that can be evaluated to determine its value
              </span>
              . This definition does not deviate far away from that of
              mathematics. We'll come back to how math and programming are
              intertwined. A{" "}
              <span className="color-pink">boolean expression</span> is any
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
                <code>hometown == "Shanghai"</code> is an expression that
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

          <RecordedPythonExercise qid="vQ40L0" className={styles.block} />

          <RecordedPythonExercise qid="aPlxFK" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>If...Else</h3>
            <span className="label green">Conditional Blocks</span>
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
              If I can't afford a full Pecking Duck, I'm heading to Panda
              Express.
            </p>
          </LargeQuote>

          <RecordedPythonExercise qid="06b664" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Why are some lines indented?</h3>
            <span className="label green">Code Blocks</span>
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

          <RecordedPythonExercise qid="qGB9SK" className={styles.block} />

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Conditional Statements
                <span className="accent blue" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label green">if</span>

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
                    <span className="label yellow">elif</span>

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
                    <span className="label pink">else</span>

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
            <p>Since I have over $50, how does Biaggis sound?</p>
          </LargeQuote>

          <RecordedPythonExercise qid="dSCsot" className={styles.block} />

          <RecordedPythonExercise qid="XzNnHb" className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
