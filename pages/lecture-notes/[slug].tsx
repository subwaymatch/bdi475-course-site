import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import path from "path";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { POSTS_PATH } from "lib/mdx/posts";
import RecordedPythonChallenge from "components/mdx/RecordedPythonChallenge";
import CenteredColumn from "components/common/CenteredColumn";

const components = {
  RecordedPythonChallenge,
  CenteredColumn,
};

export default function LectureNotePage({ source, frontMatter, params }) {
  console.log(params);

  return (
    <Layout>
      <div className="page">
        <Container>
          <Row>
            <Col>
              <nav>
                <Link href="/">
                  <a>👈 Go back home</a>
                </Link>
              </nav>
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>{frontMatter.title}</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <main>
                <MDXRemote {...source} components={components} />
              </main>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  console.log(`content=${JSON.stringify(content)}`);
  console.log(`data=${JSON.stringify(data)}`);

  // KaTeX does not work at the moment
  // see https://github.com/hashicorp/next-mdx-remote/issues/221 for details
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeHighlight, rehypeKatex],
    },
    // scope: data,
  });

  console.log(`mdxSource`);
  console.log(mdxSource);

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

// export const getStaticPaths = async () => {
//   const paths = postFilePaths
//     // Remove file extensions for page paths
//     .map((path) => path.replace(/\.mdx?$/, ""))
//     // Map the path into the static paths object required by Next.js
//     .map((slug) => ({ params: { slug } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
