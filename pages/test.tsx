import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import usePythonChallenge from "hooks/usePythonChallenge";
import { User } from "@supabase/supabase-js";
import { useUser } from "context/UserContext";
import useCodingChallengeAttempts from "hooks/useCodingChallengeAttempts";
import { definitions } from "types/database";

export default function TestPage() {
  const qid = "F7EJVQ";
  const { user, roles } = useUser();
  const { status, data: challengeData, error } = usePythonChallenge(qid);
  const { attempts, recordSubmission } = useCodingChallengeAttempts(qid);

  const getAttempts = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_attempts"]>(
        "coding_challenge_attempts"
      )
      .select(
        `
        submitted_at,
        is_success,
        user_code,
        profiles (
          display_name,
          email
        )
      `
      )
      .match({
        challenge_id: qid,
      })
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(`user=${user.id}`);
      console.log(`roles`);
      console.log(roles);
    }

    getAttempts();
  }, [user]);

  console.log(`codingQuestion`);
  console.log(challengeData);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1 className="pageTitle">Test Page</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await recordSubmission(true, "my code 1");
              }}
            >
              Add Attempt
            </button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
