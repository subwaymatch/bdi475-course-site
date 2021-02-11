import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { AuthCheck } from "reactfire";
import Login from "components/Login";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedCodingQuestion from "components/common/RecordedCodingQuestion";
import { FaWikipediaW } from "react-icons/fa";
import LargeQuote from "components/common/LargeQuote";

export default function WhileLoopsAndCollectionsPage() {
  return (
    <Layout>
      <AuthCheck fallback={<Login />}>
        <main className={styles.page}>
          <Container>
            <Row>
              <Col>
                <h2 className="sectionTitle grayBottomBorder">
                  Quiz 1
                  <span className="accent purple" />
                </h2>
              </Col>
            </Row>

            <ListWithTitle
              title="Quiz Details ⟶"
              items={[
                <>
                  You have until{" "}
                  <span className="color-pink">Thursday end of the day</span>{" "}
                  (Feb 11, 11:59 PM CST) to complete this quiz.
                </>,
                <>
                  You get <span className="color-blue">unlimited attempts</span>
                  .
                </>,
                <>Passing the test cases does not guarantee you full points.</>,
                <>We will manually review your code.</>,
                <>
                  If you make a{" "}
                  <span className="color-purple">late submission</span>,{" "}
                  <strong>we will deduct 50% of your grade</strong>.
                </>,
              ]}
              className={styles.block}
            />

            <Row>
              <Col>
                <div className={styles.coverImage}>
                  <Image
                    src="/images/notes/1612327404248.png"
                    width={3000}
                    height={2000}
                    alt=""
                  />
                </div>
              </Col>
            </Row>

            <CenteredColumn className={styles.textBox}>
              <h3>Before you begin...</h3>

              <span className="label purple">Plagiarism Policy</span>
              <p>
                <strong>Please don't plagiarize.</strong>{" "}
                <span className="color-pink">
                  Don't show your code to others, and don't ask to see others'
                  code.
                </span>{" "}
                If you're lost, email me at ypark32@illinois.edu and I will do{" "}
                <strong>everything I can do</strong> to help you.
              </p>
            </CenteredColumn>

            <RecordedCodingQuestion qid="zWeBSE" className={styles.block} />

            <RecordedCodingQuestion qid="qp1LzJ" className={styles.block} />

            <RecordedCodingQuestion qid="GYdI7m" className={styles.block} />

            <RecordedCodingQuestion qid="dooYXm" className={styles.block} />
          </Container>
        </main>
      </AuthCheck>
    </Layout>
  );
}
