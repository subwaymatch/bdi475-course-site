import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";
import usePythonChallenge from "hooks/usePythonChallenge";
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { definitions } from "types/database";
import useMultipleChoiceQuestion from "hooks/useMultipleChoiceQuestion";

export default function TestPage() {
  const { questionData, optionsData } = useMultipleChoiceQuestion(1);

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
            {questionData.status === "success" &&
            optionsData.status === "success" ? (
              <div>
                <h3>{questionData.data.title}</h3>
                <span>ID: {questionData.data.id}</span>

                <p>{questionData.data.text_markdown}</p>

                {optionsData.data.map((o) => (
                  <div key={o.id}>
                    <p>{o.text_markdown}</p>
                  </div>
                ))}
              </div>
            ) : (
              "Loading"
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
