import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import Chip from "components/common/Chip";
import { useEffect, useState } from "react";
import { supabaseClient } from "lib/supabase/supabaseClient";

export default function TestPage() {
  const [results, setResults] = useState(null);

  const load = async () => {
    const { data, error } = await supabaseClient.rpc("get_challenge_results2", {
      multiple_choice_ids: [],
    });
    setResults(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Test Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Chip label="Test Chip" small />
            </Col>
          </Row>

          <Row>
            <Col>{JSON.stringify(results)}</Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
