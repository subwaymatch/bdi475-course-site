import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedCodingQuestion from "components/common/RecordedCodingQuestion";
import LargeQuote from "components/common/LargeQuote";

export default function FunctionPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Introduction to Functions
                <span className="accent pink" />
              </h2>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Recap the <code>list</code>, <code>dict</code> data types and{" "}
                <code>for</code> loops.
              </>,
              <>
                Recap the string (<code>str</code>) data type and related
                utility methods.
              </>,
              <>Introduce the concept of functions.</>,
              <>
                Learn how to create new functions using the <code>def</code>{" "}
                keyword.
              </>,
              <>Learn parameters and return values.</>,
            ]}
            className={styles.block}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1614015382392.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedCodingQuestion qid="MAij4e" className={styles.block} />

          <RecordedCodingQuestion qid="aULgTB" className={styles.block} />

          <RecordedCodingQuestion qid="xAZehL" className={styles.block} />

          <RecordedCodingQuestion qid="bF23yB" className={styles.block} />

          <RecordedCodingQuestion qid="QDn300" className={styles.block} />

          <RecordedCodingQuestion qid="2O1csh" className={styles.block} />
        </Container>
      </main>
    </Layout>
  );
}
