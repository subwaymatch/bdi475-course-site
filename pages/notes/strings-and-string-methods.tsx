import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import LargeQuote from "components/common/LargeQuote";
import Chip from "components/common/Chip";

export default function StringsAndStringsMethodPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>Strings and String Methods</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Recap the <code>list</code> data type and <code>for</code>{" "}
                loops.
              </>,
              <>Learn how to add, concatenate, and slice lists.</>,
              <>
                Discuss the string(<code>str</code>) data type.
              </>,
              <>
                See why strings are similar to <code>list</code>s.
              </>,
              <>Learn string utility methods.</>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1613412922600.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={216}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={217}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={54}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={214}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={215}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={69}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={67}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={74}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={66}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={73}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={72}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={77}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={218}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Slicing a List</h3>

            <Chip color="green">Select Subset</Chip>

            <p>
              In Python, you can easily slice and retrieve a subset of a{" "}
              <code>list</code> using the{" "}
              <span className="color-blue">slice notation</span>. The basic
              syntax is <code>my_list[start:stop]</code> where{" "}
              <code>my_list</code> is a <code>list</code>-like value (or a
              variable). <code>start</code> and <code>stop</code> specify the{" "}
              <em>index</em> where you would like to start/stop retrieving
              values.
            </p>
          </CenteredColumn>

          <ListWithTitle
            title="Slicing"
            items={[
              <>
                <code>my_list[start:stop]</code> retrieves all values from{" "}
                <code>start</code> to <code>stop - 1</code>.
              </>,
              <>
                <code>my_list[start:]</code> retrieves all values from{" "}
                <code>start</code> to the <strong>end</strong> of the list.
              </>,
              <>
                <code>my_list[:stop]</code> retrieves all values from the{" "}
                <strong>beginning</strong> to <code>stop - 1</code>.
              </>,
              <>
                <code>my_list[:]</code> retrieves <strong>all</strong> values
                from the list. This is often used to create a <em>shallow</em>{" "}
                copy of a list.
              </>,
            ]}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={78}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={80}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={82}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={81}
            className={styles.block}
          />

          <LargeQuote className={styles.block}>
            <p>
              A string in Python is simply a <code>list</code> of characters.
            </p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={84}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={85}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={86}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={87}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={88}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={89}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={91}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={90}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
