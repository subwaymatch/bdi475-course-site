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
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Chicago");

export default function AssignmentsPage(props) {
  console.log(`AssignmentsPage props`);
  console.log(props);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1 className="pageTitle">Assignments</h1>
          </Col>
        </Row>
      </Container>

      <main className={styles.assignmentsPage}>
        <Container>
          <Row>
            <Col>
              <div className={styles.exercises}>
                <h2 className="sectionTitle">
                  Exercises <span className="accent purple" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate={dayjs("2021-01-26").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2021-01-31").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2021-02-04").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Purple}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2021-02-15").tz().format("ll")}
                  pointsAvailable={10}
                  status={AssignmentStatus.Unavailable}
                  colorTheme={ColorTheme.Purple}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.codingQuiz}>
                <h2 className="sectionTitle">
                  Coding Quiz <span className="accent pink" />
                </h2>

                <AssignmentItem
                  name="Exercise 1"
                  dueDate={dayjs("2021-01-26").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 2"
                  dueDate={dayjs("2021-01-31").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Complete}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 3"
                  dueDate={dayjs("2021-02-04").tz().format("ll")}
                  pointsAvailable={8}
                  status={AssignmentStatus.Available}
                  colorTheme={ColorTheme.Pink}
                />

                <AssignmentItem
                  name="Exercise 4"
                  dueDate={dayjs("2021-02-15").tz().format("ll")}
                  pointsAvailable={10}
                  status={AssignmentStatus.Unavailable}
                  colorTheme={ColorTheme.Pink}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.caseStudies}>
                <h2 className="sectionTitle">
                  Case Study <span className="accent blue" />
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CaseStudyItem
                name="Uber Supply and Demand"
                dueDate={dayjs("2021-01-31").tz().format("ll")}
                pointsAvailable={8}
                status={AssignmentStatus.Complete}
                thumbnail={<img src="/images/placeholder_plates.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="AirBnB Analysis"
                dueDate={dayjs("2021-02-04").tz().format("ll")}
                pointsAvailable={8}
                status={AssignmentStatus.Available}
                thumbnail={<img src="/images/placeholder_lemon.jpg" />}
              />
            </Col>

            <Col md={6}>
              <CaseStudyItem
                name="DuPont Case"
                dueDate={dayjs("2021-02-15").tz().format("ll")}
                pointsAvailable={10}
                status={AssignmentStatus.Unavailable}
                thumbnail={<img src="/images/placeholder_grapefruits.jpg" />}
              />
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
