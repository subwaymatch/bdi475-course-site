import Layout from "components/Layout";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

export default function QuizPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Quiz 2
                <span className="accent purple" />
              </h2>
            </Col>
          </Row>

          <CenteredColumn className={styles.textBox}>
            <h3>Yeezy Sneakers</h3>

            <span className="label purple">Yeezy.. Peezy?</span>
            <p>
              Have you ever heard of sneakers that cost over $1,000 in resale
              markets? 🔥🔥 I was stunned when I randomly ran into this list in{" "}
              <a href="https://www.statista.com/">Statista</a> (a data provider
              service). How exciting! You'll work with a list of most popular{" "}
              <span className="color-purple">Yeezy</span> sneakers.
            </p>
          </CenteredColumn>

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/case-studies/553675_v6_adidas_com.jpg"
                  width={1600}
                  height={512}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallenge
            challengeId="xQ9xiU"
            className={styles.block}
          />

          <RecordedPythonChallenge
            challengeId="eJleeD"
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
