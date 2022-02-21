import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import {
  extractChallenges,
  postFilePaths,
  processShortcodes,
} from "lib/mdx/posts";
import CenteredColumn from "components/common/CenteredColumn";
import Chip from "components/common/Chip";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import LargeQuote from "components/common/LargeQuote";
import RecordedMultipleChoiceQuestion from "components/common/RecordedMultipleChoiceQuestion";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";
import { ChallengesContextProvider } from "context/ChallengesContext";
import {
  Green,
  Purple,
  Yellow,
  Pink,
  Orange,
  Red,
  Blue,
  DarkerBlue,
  Navy,
  Gray,
  MediumGray,
  DarkGray,
} from "components/common/colors";
import ChallengesProgressDisplay from "components/assignments/ChallengesProgressDisplay";
import serializeWithPlugins from "lib/mdx/serializeWithPlugins";
import { IChallengeTypeAndId } from "types/challenge";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, ButtonGroup } from "@mui/material";

const components = {
  RecordedPythonChallenge,
  RecordedMultipleChoiceQuestion,
  CenteredColumn,
  LargeQuote,
  ListWithTitle,
  Chip,
  Green,
  Purple,
  Yellow,
  Pink,
  Orange,
  Red,
  Blue,
  DarkerBlue,
  Navy,
  Gray,
  MediumGray,
  DarkGray,
};

interface IPageWithChallengesProps {
  bodyMdxSource: MDXRemoteSerializeResult;
  frontMatterData: {
    [key: string]: any;
  };
  overviewMdxSources: MDXRemoteSerializeResult[];
  challenges: IChallengeTypeAndId[];
  category: string;
  slug: string;
}

export default function PageWithChallenges({
  bodyMdxSource,
  frontMatterData,
  overviewMdxSources,
  challenges,
  category,
  slug,
}: IPageWithChallengesProps) {
  const { isAdmin } = useSupabaseAuth();

  return (
    <ChallengesContextProvider challenges={challenges}>
      <Layout>
        <div className={styles.page}>
          <Container>
            {frontMatterData.title && (
              <Row>
                <Col>
                  <h1 className={styles.noteTitle}>{frontMatterData.title}</h1>
                </Col>
              </Row>
            )}

            {overviewMdxSources && (
              <ListWithTitle
                title={frontMatterData.listTitle}
                items={overviewMdxSources.map((source) => (
                  <MDXRemote {...source} components={components} />
                ))}
              />
            )}

            {frontMatterData.thumbnailSrc && (
              <Row>
                <Col>
                  <div className={styles.coverImage}>
                    <Image
                      src={frontMatterData.thumbnailSrc}
                      width={frontMatterData.thumbnailWidth}
                      height={frontMatterData.thumbnailHeight}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            )}

            <Row>
              <Col>
                <main className={styles.composable}>
                  {isAdmin && challenges?.length > 0 && (
                    <ButtonGroup>
                      <Link href={`/${category}/${slug}/results-summary`}>
                        <a>
                          <Button
                            size="large"
                            disableElevation
                            startIcon={<ArrowForwardIcon />}
                          >
                            View Submission Results Summary
                          </Button>
                        </a>
                      </Link>
                    </ButtonGroup>
                  )}

                  <MDXRemote {...bodyMdxSource} components={components} />
                </main>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>

      <ChallengesProgressDisplay />
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

  let objectives = frontMatterData.listItems;
  let overviewMdxSources: MDXRemoteSerializeResult[] = null;

  if (objectives && objectives.length > 0) {
    overviewMdxSources = [];

    for (const o of objectives) {
      const newSource = await serializeWithPlugins(o);

      overviewMdxSources.push(newSource);
    }
  }

  const challenges = extractChallenges(content);
  const replacedStr = processShortcodes(content);

  // KaTeX does not work at the moment
  // see https://github.com/hashicorp/next-mdx-remote/issues/221 for details
  const bodyMdxSource = await serializeWithPlugins(replacedStr);

  return {
    props: {
      bodyMdxSource,
      frontMatterData,
      overviewMdxSources,
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
