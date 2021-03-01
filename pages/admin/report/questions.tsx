import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "components/Layout";
import clsx from "clsx";
import styles from "styles/pages/admin/report/questions.module.scss";
import { RiDownloadLine } from "react-icons/ri";

export default function QuestionsReportPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [ids, setIds] = useState("IoPUN0\npAXDI1\nfveynH\n");
  const router = useRouter();

  const updateIds = (idsStr) => {
    setIds(idsStr.split("\n").filter((s) => s.trim() !== ""));
  };

  useEffect(() => {});

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <p>{props.message}</p>
              <h2 className="sectionTitle grayBottomBorder">
                Questions Report <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <h3>Questions IDs</h3>
            </Col>

            <Col md={8}>
              <textarea
                className={styles.textarea}
                onChange={(e) => updateIds(e.target.value)}
                cols={30}
                rows={10}
                defaultValue={"IoPUN0\npAXDI1\nfveynH\n".replace("\\n", "\n")}
              />
              <a className={clsx("button", "green", styles.submitButton)}>
                <RiDownloadLine
                  className={styles.reactIcon}
                  style={{
                    marginRight: 12,
                  }}
                />
                <span>Download Report</span>
              </a>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    console.log(`params: ${JSON.stringify(ctx.params)}`);
    console.log(`query: ${JSON.stringify(ctx.query)}`);

    const qids = ctx.query.qid;

    const questionAttemptDocRef = await firebaseAdmin
      .firestore()
      .collection("questionAttempts")
      .where(firebaseAdmin.firestore.FieldPath.documentId(), "in", qids);

    // The user is authenticated
    const { uid, email } = token;

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // Either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType
    // The props returned here don't matter since
    // we are redirecting the user
    return { props: {} as never };
  }
};
