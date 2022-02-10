import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { extractChallenges, postFilePaths } from "lib/mdx/posts";
import styles from "styles/pages/notes/common.module.scss";
import { ChallengesContextProvider } from "context/ChallengesContext";
import { IChallengeResultSummary, IChallengeTypeAndId } from "types/challenge";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { getMultipleChoiceIds, getPythonChallengeIds } from "utils/challenge";
import { useEffect, useState } from "react";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import Link from "next/link";

interface IChallengeResultsSummaryPageProps {
  frontMatterData: {
    [key: string]: any;
  };
  challenges: IChallengeTypeAndId[];
  category: string;
  slug: string;
}

export default function ChallengeResultsSummary({
  frontMatterData,
  challenges,
  category,
  slug,
}: IChallengeResultsSummaryPageProps) {
  const { isAdmin } = useSupabaseAuth();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

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
    load();
  }, []);

  return (
    <ChallengesContextProvider challenges={challenges}>
      <Layout>
        <div className={styles.page}>
          <Container>
            {frontMatterData.title && (
              <Row>
                <Col>
                  <h1 className={styles.noteTitle}>
                    {frontMatterData.title} Results Summary
                  </h1>
                </Col>
              </Row>
            )}

            {!results && (
              <Row>
                <Col>Loading...</Col>
              </Row>
            )}

            {results && (
              <>
                <Row>
                  <Col>
                    <Box
                      sx={{
                        marginBottom: "2rem",
                      }}
                    >
                      <ButtonGroup>
                        <Link href={`/${category}/${slug}`}>
                          <a>
                            <Button size="large">
                              ⟵ Back to {frontMatterData.title}
                            </Button>

                            <Button size="large" onClick={download}>
                              Download as CSV
                            </Button>
                          </a>
                        </Link>
                      </ButtonGroup>
                    </Box>
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
                            <td>{o.email}</td>
                            <td>{o.display_name}</td>
                            <td>{o.num_correct}</td>
                            <td>{o.num_challenges}</td>
                            <td>{o.percentage}%</td>
                            <td>{o.last_success}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Modal
                      open={isDetailModalOpen}
                      onClose={() => {
                        setIsDetailModalOpen(false);
                      }}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box>
                        <h2>Hello World</h2>
                        Modal
                      </Box>
                    </Modal>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </Layout>
    </ChallengesContextProvider>
  );
}

export const getStaticProps = async ({ params }) => {
  // find .mdx file path
  const postFilePath = path.join.apply(null, [
    process.cwd(),
    "_mdx_posts",
    params.category,
    `${params.slug}.mdx`,
  ]);
  const source = fs.readFileSync(postFilePath);

  const { content, data: frontMatterData } = matter(source);

  const challenges = extractChallenges(content);

  return {
    props: {
      frontMatterData,
      challenges,
      category: params.category,
      slug: params.slug,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((path) => {
      const splitPath = path.split("/");
      const category = splitPath.length === 3 ? splitPath[1] : "uncategorized";
      const slug = splitPath.length === 3 ? splitPath[2] : splitPath[1];

      return { params: { category, slug } };
    });

  return {
    paths,
    fallback: false,
  };
};
