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

  const createChallenge = async () => {
    const { data, error } = await supabaseClient
      .from<definitions["coding_challenges"]>("coding_challenges")
      .insert([{}]);

    if (error) {
      console.error(error);
    } else {
      console.log("Insert result");
      console.log(data);
    }
  };

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
                await createChallenge();
              }}
            >
              Create a new row in coding_challenges table
            </button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
