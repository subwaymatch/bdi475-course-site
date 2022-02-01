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
import usePythonChallenges from "hooks/usePythonChallenges";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";

const pythonChallengeIds = [6, 152, 154];
const multipleChoiceIds = [1, 2];

export default function VariablesAndDataTypesPage() {
  const { data } = usePythonChallenges(pythonChallengeIds);

  console.log(`python challenges`);
  console.log(data);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>Variables and Data Types</h1>
            </Col>
          </Row>

          <RecordedPythonChallenge
            challengeId={152}
            challenge={data?.find((o) => o.id == 152)}
          />

          <RecordedPythonChallenge
            challengeId={154}
            challenge={data?.find((o) => o.id == 154)}
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
