import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import Image from "next/image";
import clsx from "clsx";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import ListWithTitle from "components/common/ListWithTitle";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { definitions } from "types/database";

const codingChallengeIds = [6, 152, 154];
const multipleChoiceIds = [1, 2];

export default function VariablesAndDataTypesPage() {
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = async () => {
    const { data: summaryData, error: summaryError } = await supabaseClient.rpc(
      "get_coding_challenge_submissions_summary",
      {
        challenge_ids: codingChallengeIds,
      }
    );

    console.log(`summaryData`);
    console.log(summaryData);

    const { data: codingChallengesData, error: codingChallengesError } =
      await supabaseClient
        .from<definitions["coding_challenges"]>("coding_challenges")
        .select()
        .in("id", codingChallengeIds);

    console.log(`challengeData`);
    console.log(codingChallengesData);

    const { data: multipleChoiceData, error: multipleChoiceError } =
      await supabaseClient
        .from<definitions["multiple_choice_questions"]>(
          "multiple_choice_questions"
        )
        .select()
        .in("id", multipleChoiceIds);

    console.log(`multipleChoiceData`);
    console.log(multipleChoiceData);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>Variables and Data Types</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                What are <span className="color-green">data types</span>?
              </>,
              <>Understand basic data types.</>,
              <>
                Understand what <span className="color-purple">variables</span>{" "}
                are.
              </>,
              <>Why do we need variables?</>,
            ]}
          />

          <RecordedPythonChallengeById
            challengeId={6}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={152}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={154}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
