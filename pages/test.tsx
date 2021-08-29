import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import usePythonChallenge from "hooks/usePythonChallenge";
import { User } from "@supabase/supabase-js";
import { useUser } from "context/UserContext";
import { definitions } from "types/database";

export default function TestPage() {
  useEffect(() => {
    console.log(process.env);
    console.log(
      `process.env.NEXT_PUBLIC_BLACK_LAMBDA_ENDPOINT=${process.env.NEXT_PUBLIC_BLACK_LAMBDA_ENDPOINT}`
    );
  }, []);

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
