import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { postFilePaths, POSTS_PATH } from "lib/mdx/posts";

export default function LectureNotePage({ source, frontMatter }) {
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
                <span className="katex">
                  <span className="katex-mathml">
                    The KaTeX stylesheet is not loaded!
                  </span>
                  <span className="katex-version rule">
                    KaTeX stylesheet version:{" "}
                  </span>
                </span>

                <MDXRemote {...source} />
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

  const { content, data } = matter(source);

  console.log(`content=${JSON.stringify(content)}`);
  console.log(`data=${JSON.stringify(data)}`);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
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
