import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import AssignmentItem from "components/pages/assignments/AssignmentItem";
import CaseStudyItem from "components/pages/assignments/CaseStudyItem";
import { AssignmentStatus } from "typings/assignment";
import { ColorTheme } from "typings/color-theme";
import styles from "styles/pages/assignments.module.scss";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "firebase/firebaseAdmin";

export default function AssignmentsPage(props) {
  return (
    <Layout>
      <main className={styles.assignmentsPage}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Assignments</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.exercises}>
                <h2 className="sectionTitle">
                  No Exercises Posted <span className="accent purple" />
                </h2>
              </div>
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
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // Fetch assigments data here

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed
    // either way: redirect to the sign in page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {} as never,
    };
  }
};
