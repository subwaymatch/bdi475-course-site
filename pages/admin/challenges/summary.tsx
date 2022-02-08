import Layout from "components/Layout";
import Button from "components/ui/Button";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IChallengeResultSummary, IChallengeTypeAndId } from "types/challenge";
import {
  expandFromQueryObject,
  getMultipleChoiceIds,
  getPythonChallengeIds,
} from "utils/challenge";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { GrDocumentCsv } from "react-icons/gr";
import { ColorTheme } from "types/color-theme";
import { BsDownload } from "react-icons/bs";
import { RiDownloadLine } from "react-icons/ri";
import Link from "next/link";

export default function ChallengeResultsSummary() {
  const { isAdmin } = useSupabaseAuth();
  const router = useRouter();
  const [challenges, setChallenges] = useState<IChallengeTypeAndId[]>(null);
  const [results, setResults] = useState<IChallengeResultSummary[]>(null);

  const load = async () => {
    const { data, error } = await supabaseClient.rpc<IChallengeResultSummary>(
      "get_challenge_results_summary",
      {
        python_challenge_ids: getPythonChallengeIds(challenges),
        multiple_choice_ids: getMultipleChoiceIds(challenges),
      }
    );

    setResults(data);
  };

  const download = async () => {
    const { data, error } = await supabaseClient
      .rpc<IChallengeResultSummary>("get_challenge_results_summary", {
        python_challenge_ids: getPythonChallengeIds(challenges),
        multiple_choice_ids: getMultipleChoiceIds(challenges),
      })
      .csv();

    var blob = new Blob([data], { type: "text/csv;charset=utf-8" });

    saveAs(blob, `challenges-summary-${dayjs().format("YYYYMMDD-hhmmss")}.csv`);
  };

  useEffect(() => {
    if (router.isReady) {
      setChallenges(expandFromQueryObject(router.query as any));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (challenges) {
      load();
    }
  }, [challenges]);

  return (
    <Layout>
      <div className="page">
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Results Summary</h1>
            </Col>
          </Row>

          {!results && (
            <Row>
              <Col>Loading...</Col>
            </Row>
          )}

          {results && (
            <>
              <Row>
                <Col>
                  <div
                    style={{
                      borderTop: "1px solid #eee",
                      paddingTop: "1rem",
                      paddingBottom: "3rem",
                    }}
                  >
                    <Button
                      onClick={download}
                      label="Download as CSV"
                      IconComponent={RiDownloadLine}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <table className="left">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Correct Count</th>
                        <th>Number of Challenges</th>
                        <th>Percentage</th>
                        <th>Last Success</th>
                      </tr>
                    </thead>

                    <tbody>
                      {results?.map((o) => (
                        <tr key={o.uid}>
                          <td>
                            <Link
                              href={{
                                pathname: "/admin/challenges/details",
                                query: Object.assign(
                                  {},
                                  {
                                    user_id: o.uid,
                                  },
                                  router.query
                                ),
                              }}
                            >
                              {o.email}
                            </Link>
                          </td>
                          <td>{o.display_name}</td>
                          <td>{o.num_correct}</td>
                          <td>{o.num_challenges}</td>
                          <td>{o.percentage}%</td>
                          <td>{o.last_success}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
}
