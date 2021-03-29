import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonExercise from "components/common/RecordedPythonExercise";
import LargeQuote from "components/common/LargeQuote";

export default function WhileLoopsAndCollectionsPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                While Loops and Collections
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Recap the <code>list</code> data type and <code>for</code>{" "}
                loops.
              </>,
              <>
                Introduce <code>while</code> loops.
              </>,
              <>
                How are <code>for</code> loops and <code>while</code> loops
                different?
              </>,
              <>
                Introduce <code>dict</code>, <code>tuple</code> data types.
              </>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612976054318.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonExercise qid="obNzHK" className={styles.block} />

          <RecordedPythonExercise qid="XYmi8W" className={styles.block} />

          <RecordedPythonExercise qid="jeNfHw" className={styles.block} />

          <RecordedPythonExercise qid="IpDjaR" className={styles.block} />

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
                      <span className="color-blue">value</span> in the supplied{" "}
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

          <RecordedPythonExercise qid="7Bf7VZ" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>While Loops</h3>

            <span className="label purple">Indefinite Iteration</span>
            <p>
              Last time, we covered the first type of loop in Python - the{" "}
              <code>for</code> loop. A <code>for</code> loop takes a{" "}
              <code>list</code>-like data and iterates over each element.
            </p>

            <p>
              Generally speaking, you use a <code>for</code> loop when you know
              how many times you'd like to iterate before entering the loop.{" "}
              <code>for i in range(6)</code> will iterate 6 times unless you
              explicitly exit the loop (which we haven't discussed yet).
            </p>

            <p>
              The <code>while</code> loop serves a different purpose. You can
              use the <code>while</code> loop if you want to keep on iterating
              until a certain condition is satisfied.
            </p>
            <p>
              At each iteration, the while loop checks whether a condition is
              satisfied. It will run <strong>indefinitely</strong> until the
              condition is NOT satisfied.
            </p>

            <span className="label pink">Skip Discussion For Now</span>
            <p>
              Although <code>while</code> loops can be useful at times, we won't
              find many uses for the purpose of this course. For now, you only
              need to remember that <code>while</code> loops{" "}
              <em>can be used</em> to keep iterating when you don't know how
              many times to loop in advance.
            </p>

            <p>
              Now comes the data type that is <strong>critical</strong> in
              programming - the <span className="color-purple">dictionary</span>{" "}
              type.
            </p>
          </CenteredColumn>

          <LargeQuote className={styles.block}>
            <p>A Python dictionary is... just like a real dictionary.</p>
          </LargeQuote>

          <RecordedPythonExercise qid="Lt10jp" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Dictionary</h3>

            <span className="label green">Key-Value Pairs</span>
            <p>
              Do you know what <span className="color-pink">terpsichorean</span>{" "}
              means? How about <span className="color-blue">appoggiatura</span>?
              If you know... you must read dictionaries for entertainment. If
              you don't, you're on the same boat as me. Let's look these up in
              an English dictionary.
            </p>
            <p>
              <span className="color-pink">Terpsichorean</span> is defined in
              the dictionary as{" "}
              <em className="color-pink">"pertaining to dancing"</em>.{" "}
              <span className="color-blue">Appoggiatura</span> is defined as{" "}
              <em className="color-blue">
                "a note of embellishment preceding another note and taking a
                portion of its time"
              </em>
              .
            </p>
            <p>
              Why am I talking about these obscure vocabularies in a Data
              Analytics course? You're about to find out.
            </p>
          </CenteredColumn>

          <RecordedPythonExercise qid="b49up1" className={styles.block} />

          <RecordedPythonExercise qid="9UsGYK" className={styles.block} />

          <LargeQuote className={styles.block}>
            <p>
              <span className="color-purple">What was the joke?</span>
              <br />
              You had to be there.
              <br />
              <span className="color-purple">Oh, Geography joke!</span>
            </p>
          </LargeQuote>

          <Row className={clsx(styles.boxItems)}>
            <Col>
              <h2 className="sectionTitle">
                Working with a Dictionary
                <span className="accent green" />
              </h2>

              <Row>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label green">Retrieve a Value by Key</span>
                    <p>
                      Assume we're working with a dictionary named{" "}
                      <code>my_dict</code>. To retrieve a value by a key, use
                      square brackets (e.g., <code>my_dict['name']</code>).
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label yellow">Add a Key-Value Pair</span>
                    <p>
                      To add a new key-value pair, use square brackets with an
                      assignment operation (e.g.,{" "}
                      <code>my_dict['gpa'] = 2.0</code>).
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <span className="label pink">Update a Key-Value pair</span>
                    <p>
                      To update an existing key-value pair, use square brackets
                      with an assignment operation (e.g.,{" "}
                      <code>my_dict['gpa'] = 3.66</code>).{" "}
                      <span className="color-pink">
                        This syntax is identical that of creating a new
                        key-value pair.
                      </span>
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonExercise qid="iR2yBE" className={styles.block} />

          <RecordedPythonExercise qid="6S3aJI" className={styles.block} />

          <RecordedPythonExercise qid="qskNt6" className={styles.block} />

          <RecordedPythonExercise qid="5kKcWA" className={styles.block} />

          <RecordedPythonExercise qid="Cn11Co" className={styles.block} />

          <RecordedPythonExercise qid="2CxDZ5" className={styles.block} />

          <CenteredColumn className={styles.textBox}>
            <h3>Tuples</h3>

            <span className="label green">Immutable</span>

            <p>
              The final collection data type we'll discuss is the{" "}
              <code>tuple</code> type. A <code>tuple</code> is an immutable
              collection. You can only set the values when you create a{" "}
              <code>tuple</code>.
            </p>

            <p>
              <strong>TL;DR</strong>: It's EXACTLY like a list, but you can't
              update an element once you create it.
            </p>
          </CenteredColumn>

          <RecordedPythonExercise qid="Sga7CT" className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
