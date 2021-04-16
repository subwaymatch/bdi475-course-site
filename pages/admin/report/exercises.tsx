import { useState, useEffect } from "react";
import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "components/Layout";
import clsx from "clsx";
import styles from "styles/pages/admin/report/questions.module.scss";
import { RiDownloadLine } from "react-icons/ri";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import saveAs from "file-saver";

export default function ExercisesReportPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [ids, setIds] = useState(
    props.qids ? props.qids : ["zWeBSE", "qp1LzJ", "GYdI7m", "dooYXm"]
  );
  const [result, setResult] = useState("");
  const { user, claims } = useFirebaseAuth();

  const updateIds = (idsStr) => {
    setIds(idsStr.split("\n"));
  };

  const fetchExerciseResults = async (ids) => {
    if (!user || !claims.admin) {
      return;
    }

    try {
      const token = await user.getIdToken();
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      let params = new URLSearchParams("");
      ids
        .filter((s) => s.trim() !== "")
        .forEach((id) => params.append("qid", id));

      fetch(`/api/admin/report/exercises?${params.toString()}`, options)
        .then((response) => response.blob())
        .then((blob) => saveAs(blob, "test.csv"));

      // setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult(err.message);
    }
  };

  useEffect(() => {});

  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h2 className="sectionTitle grayBottomBorder">
                Exercises Report <span className="accent green" />
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
                value={ids.join("\n")}
              />
              <a
                className={clsx("button", "green", styles.submitButton)}
                onClick={() => fetchExerciseResults(ids)}
              >
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

          <Row>
            <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const props: any = {};

  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // The user is authenticated
    const { uid, email } = token;

    props.message = `Your email is ${email} and your UID is ${uid}.`;
  } catch {
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

  return {
    props,
  };
};
