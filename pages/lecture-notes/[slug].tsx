import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import path from "path";
import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { POSTS_PATH, postFilePaths, processShortcodes } from "lib/mdx/posts";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import CenteredColumn from "components/common/CenteredColumn";
import Chip from "components/common/Chip";
import styles from "styles/pages/notes/common.module.scss";
import ListWithTitle from "components/common/ListWithTitle";
import LargeQuote from "components/common/LargeQuote";
import RecordedMultipleChoiceQuestionById from "components/common/RecordedMultipleChoiceQuestionById";
import RecordedPythonChallenge from "components/common/RecordedPythonChallenge";
import useMultipleChoiceQuestions from "hooks/useMultipleChoiceQuestions";
import usePythonChallenges from "hooks/usePythonChallenges";
import useChallengeResults from "hooks/useChallengeResults";
import { createContext } from "react";
import { definitions } from "types/database";
import {
  IChallengeResult,
  IMultipleChoiceQuestionWithOptions,
} from "types/database/multiple-choice";
import { ChallengesContextProvider } from "context/ChallengesContext";

const components = {
  RecordedPythonChallenge,
  RecordedMultipleChoiceQuestionById,
  CenteredColumn,
  LargeQuote,
  Chip,
};

export default function LectureNotePage({
  objectiveMdxSources,
  bodyMdxSource,
  frontMatterData,
  challenges,
}) {
  const multipleChoiceIds = challenges
    .filter((o) => o.challengeType === "multiple-choice")
    .map((o) => o.challengeId);
  const pythonChallengeIds = challenges
    .filter((o) => o.challengeType === "python-challenge")
    .map((o) => o.challengeId);

  return (
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

          {objectiveMdxSources && (
            <ListWithTitle
              title="Objectives ⟶"
              items={objectiveMdxSources.map((source) => (
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
                <ChallengesContextProvider
                  multipleChoiceIds={multipleChoiceIds}
                  pythonChallengeIds={pythonChallengeIds}
                >
                  <MDXRemote {...bodyMdxSource} components={components} />
                </ChallengesContextProvider>
              </main>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data: frontMatterData } = matter(source);

  let objectives = frontMatterData.objectives;
  let objectiveMdxSources = null;

  if (objectives && objectives.length > 0) {
    objectiveMdxSources = [];

    for (const o of objectives) {
      const newSource = await serialize(o, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeHighlight, rehypeKatex],
        },
      });

      objectiveMdxSources.push(newSource);
    }
  }

  let { replacedStr, challenges } = processShortcodes(content);

  // KaTeX does not work at the moment
  // see https://github.com/hashicorp/next-mdx-remote/issues/221 for details
  const mdxSource = await serialize(replacedStr, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeHighlight, rehypeKatex],
    },
    // scope: data,
  });

  return {
    props: {
      bodyMdxSource: mdxSource,
      frontMatterData,
      objectiveMdxSources,
      challenges,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
