import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonExercise from "components/common/RecordedPythonExercise";
import LargeQuote from "components/common/LargeQuote";

export default function ListsAndLoopsPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Lists and Loops
                <span className="accent blue" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Review <code>if</code>, <code>elif</code>, <code>else</code>{" "}
                statements.
              </>,
              <>
                Introduce the <code>list</code> data type.
              </>,
              <>Learn how to create, access, edit a list.</>,
              <>
                Use a <code>for</code> loop to iterate over a list.
              </>,
              <>
                Use a <code>while</code> loop to iterate until a condition is
                satisfied.
              </>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612807674326.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonExercise qid="B2Z3Nz" className={styles.block} />

          <RecordedPythonExercise qid="PZbhws" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Introduction to Lists</h3>

            <span className="label green">Overview</span>

            <p>
              The code you wrote above is great. But with a degree from the U of
              I, you will likely get more than one job offer. As an example,
              assume you get three offers. Can you <em>reuse</em> the logic
              you've already written? Yes! But we'll first need to cover a new
              data type (<code>list</code>) and a new syntax (<code>for</code>{" "}
              loops).
            </p>

            <p>
              Last time, we talked about <code>int</code>, <code>float</code>,{" "}
              and <code>str</code> types. Variables with these three types can
              only contain a single value. That&#39;s why they are called{" "}
              <em>primitive</em> data types. The <code>list</code> type is the
              first non-primitive data type we&#39;ve seen. Square brackets (
              <code>[]</code>) are used to denote a list type.
            </p>
          </CenteredColumn>

          <RecordedPythonExercise qid="AMl9MN" className={styles.block} />

          <RecordedPythonExercise qid="JbjkgM" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Accessing list elements by index</h3>
            <span className="label blue">Zero-based Index</span>
            <p>
              What does that <code>offers[0]</code> do? The square brackets used
              in <code>offers[0]</code> denote the <em>index</em> of the element
              you're trying to retrieve. <code>offers[0]</code> retrieves the
              first value in the array, which is <code>55000</code> in our code.
              But why does the index start at zero, not one?
            </p>
            <p>
              In many programming languages including Python, you start counting
              indices at zero, not one. To retrieve the second item from{" "}
              <code>my_list</code>, the correct code would be{" "}
              <code>my_list[1]</code>, not <code>my_list[2]</code>.
            </p>
          </CenteredColumn>

          <RecordedPythonExercise qid="r4xjZt" className={styles.block} />

          <RecordedPythonExercise qid="f7DY43" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Can a list have elements with non-uniform data types?</h3>
            <span className="label pink">You Bet</span>
            <p>
              From the previous coding question, we're able to see that a list
              can have elements with mixed data types. A list can hold{" "}
              <strong>any</strong> data type. In fact, a list can hold another
              list, which is called a{" "}
              <em className="color-purple">nested list</em>. For now, let's keep
              it simple and not worry about nested lists.
            </p>
          </CenteredColumn>

          <LargeQuote className={styles.block}>
            <p>
              A list can contain a list that contains another list that contains
              another list... and so on.
            </p>
          </LargeQuote>

          <RecordedPythonExercise qid="f53Gw6" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Do we really want to keep copy-pasting stuff?</h3>

            <span className="label purple">Nope</span>
            <p>
              Well that's a little inefficient, isn't it? You may be okay with
              copy-pasting the <code>print(roster[n])</code> code a couple of
              times. But imagine if the <code>roster</code> list had 1,000
              names. You'd be spending your entire afternoon copy-pasting and
              changing numbers.
            </p>
          </CenteredColumn>

          <RecordedPythonExercise qid="tSheIA" className={styles.block} />

          <RecordedPythonExercise qid="M5pUHB" className={styles.block} />

          <RecordedPythonExercise qid="iVUt8c" className={styles.block} />

          <RecordedPythonExercise qid="FCTXPT" className={styles.block} />

          <RecordedPythonExercise qid="aQOWTX" className={styles.block} />

          <Row className={clsx(styles.boxItems)}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="sectionTitle">
                Two types of loops
                <span className="accent purple" />
              </h2>

              <Row>
                <Col md={6}>
                  <div className={styles.item}>
                    <span className="label blue">For Loops</span>

                    <p>
                      You must supply a <code>list</code>-like data to{" "}
                      <code>for</code>...<code>in</code> loops. Python will
                      iterate over each{" "}
                      <span className="color-blue">value</span> in the supplied
                      <code>list</code>-like data.
                    </p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className={styles.item}>
                    <span className="label green">While Loops</span>

                    <p>
                      A <code>while</code> loop will continue to run until a
                      specific condition is satisfied. Without satisfying the
                      exit condition, your loop will run{" "}
                      <strong>forever</strong>.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonExercise qid="woLrZ7" className={styles.block} />

          <RecordedPythonExercise qid="549Yuv" className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
