import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import usePythonChallenge from "hooks/usePythonChallenge";
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { definitions } from "types/database";
import useMultipleChoiceQuestion from "hooks/useMultipleChoiceQuestion";
import RecordedMultipleChoiceQuestion from "components/common/RecordedMultipleChoiceQuestion";

export default function TestPage() {
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
            <RecordedMultipleChoiceQuestion questionId={1} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
