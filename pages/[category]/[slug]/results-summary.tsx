import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { extractChallenges, postFilePaths } from "lib/mdx/posts";
import styles from "styles/pages/notes/common.module.scss";
import { ChallengesContextProvider } from "context/ChallengesContext";
import { IChallengeResultSummary, IChallengeTypeAndId } from "types/challenge";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { getMultipleChoiceIds, getPythonChallengeIds } from "utils/challenge";
import { useEffect, useState } from "react";
import saveAs from "file-saver";
import dayjs from "dayjs";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import { VscEye } from "react-icons/vsc";
import ChallengeResultsModal from "components/challenges/view/ChallengeResultsModal";

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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [detailUserId, setDetailUserId] = useState<string>(null);

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

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setDetailUserId(null);
  };

  const openDetailModal = (userId: string) => {
    setDetailUserId(userId);
    setIsDetailModalOpen(true);
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
                          <Button
                            size="large"
                            disableElevation
                            startIcon={<ArrowBackIcon />}
                          >
                            Back to {frontMatterData.title}
                          </Button>
                        </Link>

                        <Button
                          size="large"
                          disableElevation
                          onClick={download}
                          startIcon={<DownloadIcon />}
                        >
                          Download as CSV
                        </Button>
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
                          <th>Details</th>
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
                            <td>
                              <Button
                                onClick={() => openDetailModal(o.uid)}
                                variant="outlined"
                                size="small"
                                startIcon={<VscEye />}
                              >
                                View
                              </Button>
                            </td>
                            <td>
                              {o.last_success &&
                                dayjs(o.last_success).format(
                                  "YYYY-MM-DD hh:mm a"
                                )}
                            </td>
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

        <ChallengeResultsModal
          challenges={challenges}
          userId={detailUserId}
          isOpen={isDetailModalOpen}
          handleClose={handleDetailModalClose}
        />
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
