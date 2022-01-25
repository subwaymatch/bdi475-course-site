import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import LargeQuote from "components/common/LargeQuote";
import Chip from "components/common/Chip";

export default function LoopsAndCollectionsPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>Loops and Collections</h1>
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
                Review <code>while</code> loops.
              </>,
              <>
                How are <code>for</code> loops and <code>while</code> loops
                different?
              </>,
              <>
                Introduce <code>dict</code>, <code>tuple</code> data types.
              </>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612973757417.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={32}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={24}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={31}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={19}
            className={styles.block}
          />

          <Row className={clsx(styles.boxItems)}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="sectionTitle">
                Two types of loops
                <span className="accent purple" />
              </h2>

              <Row>
                <Col md={6}>
                  <div className={styles.item}>
                    <Chip color="blue">For Loops</Chip>

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
                    <Chip color="green">While Loops</Chip>

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

          <RecordedPythonChallengeById
            challengeId={38}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>While Loops</h3>

            <Chip color="purple">Indefinite Iteration</Chip>
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

            <Chip color="pink">Skip Discussion For Now</Chip>
            <p>
              Although <code>while</code> loops can be useful at times, we won't
              find many uses for the purpose of this course. For now, you only
              need to remember that <code>while</code> loops <em>can be</em>{" "}
              used to keep iterating when you don't know how many times to loop
              in advance.
            </p>

            <p>
              Now comes the data type that is <strong>critical</strong> in
              programming - the <span className="color-purple">dictionary</span>{" "}
              type.
            </p>
          </CenteredColumn>

          <CenteredColumn className={styles.textBox}>
            <h3>Dictionary</h3>

            <Chip color="green">Key-Value Pairs</Chip>
            <p>
              Do you know what <em className="color-green">terpsichorean</em>{" "}
              means? How about <em className="color-purple">appoggiatura</em>?
              If you know... you must read dictionaries for fun. 🤡 If you
              don't, you're on the same boat as me. Let's look these up in an
              English dictionary (
              <a href="https://dictionary.com">https://www.dictionary.com/</a>
              ).
            </p>
            <p>
              <span className="color-green">Terpsichorean</span> is defined in
              the dictionary as{" "}
              <em className="color-green">"pertaining to dancing"</em>.{" "}
              <span className="color-purple">Appoggiatura</span> is defined as{" "}
              <em className="color-purple">
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

          <RecordedPythonChallengeById
            challengeId={47}
            className={styles.block}
          />

          <LargeQuote className={styles.block}>
            <p>A Python dictionary is... just like a real dictionary.</p>
          </LargeQuote>

          <CenteredColumn className={styles.textBox}>
            <Chip color="yellow">Creating an empty dictionary</Chip>
            <p>
              You can create an empty dictionary using the following syntax:{" "}
              <code>my_dict = &#123;&#125;</code>.
            </p>

            <Chip color="blue">Dictionary with initial values</Chip>
            <p>
              You can create a dictionary with initial values using the
              following syntax:{" "}
              <code>
                my_dict = &#123; "my_key1": "my_value1", "my_key2": "my_value2"
                &#125;
              </code>
              .
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={43}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={201}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={200}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={41}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={202}
            className={styles.block}
          />

          <LargeQuote className={styles.block}>
            <p>
              <span className="color-green">I’m so good at finance...</span>
              <br />
              Even my bank says my balance is outstanding.
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
                    <Chip color="green">Retrieve a Value by Key</Chip>
                    <p>
                      Assume we're working with a dictionary named{" "}
                      <code>my_dict</code>. To retrieve a value by a key, use
                      square brackets (e.g., <code>my_dict["name"]</code>).
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="yellow">Add a Key-Value Pair</Chip>
                    <p>
                      To add a new key-value pair, use square brackets with an
                      assignment operation (e.g.,{" "}
                      <code>my_dict["gpa"] = 2.0</code>).
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.item}>
                    <Chip color="pink">Update a Key-Value pair</Chip>
                    <p>
                      To update an existing key-value pair, use square brackets
                      with an assignment operation (e.g.,{" "}
                      <code>my_dict["gpa"] = 3.66</code>).{" "}
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

          <RecordedPythonChallengeById
            challengeId={50}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={203}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={59}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={204}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={205}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={60}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={58}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={51}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={61}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={206}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={207}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={208}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={209}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Tuples</h3>

            <Chip color="green">Immutable</Chip>

            <p>
              The final collection data type we'll discuss is the{" "}
              <code>tuple</code> type. A <code>tuple</code> is an immutable
              collection. You can only set the values when you create a{" "}
              <code>tuple</code>.
            </p>

            <p>
              <strong>TL;DR</strong> It's EXACTLY like a list, but you can't
              update an element once you create it.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={52}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
