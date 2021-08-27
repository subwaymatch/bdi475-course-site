import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";
import LargeQuote from "components/common/LargeQuote";

export default function StringsAndStringsMethodPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Strings and String Methods
                <span className="accent blue" />
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
              <>Learn how to add, concatenate, and slice lists.</>,
              <>
                Discuss the string(<code>str</code>) data type.
              </>,
              <>
                See why strings are similar to <code>list</code>s.
              </>,
              <>Learn string utility methods.</>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1613413146477.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge
            challengeId="rZ8rOH"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="OFKydi"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="LFbn3g"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="la9oRa"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="JywcpO"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="fndC2H"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="eF30nG"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="SzjYaZ"
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Slicing a List</h3>

            <span className="label green">Select Subset</span>

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

          <RecordedPythonChallenge
            challengeId="e07FQY"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="9qJE5d"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="Sidyvz"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="ShuTgg"
            className={styles.block}
          />

          <LargeQuote className={styles.block}>
            <p>
              A string in Python is simply a <code>list</code> of characters.
            </p>
          </LargeQuote>

          <RecordedPythonChallenge
            challengeId="V3BU43"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="usPdIu"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="BmBkYk"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="6dPqws"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="Arh1Ot"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="LVN4bl"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="9frSZB"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="zae2AY"
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
