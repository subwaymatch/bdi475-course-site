import Layout from "components/Layout";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "styles/pages/admin/report/questions.module.scss";
import { RiDownloadLine } from "react-icons/ri";

export default function QuestionsReportPage() {
  const [ids, setIds] = useState("");

  const updateIds = (idsStr) => {
    setIds(idsStr.split("\n").filter((s) => s.trim() !== ""));
  };

  useEffect(() => {});

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Questions Report <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <h3>Questions IDs</h3>
            </Col>

            <Col md={8}>
              <textarea
                className={styles.textarea}
                onChange={(e) => updateIds(e.target.value)}
                cols={30}
                rows={10}
              />
              <a className={clsx("button", "green", styles.submitButton)}>
                <RiDownloadLine
                  className={styles.reactIcon}
                  style={{
                    marginRight: 12,
                  }}
                />
                <span>Download Report</span>
              </a>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
