import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "components/Layout";
import clsx from "clsx";
import styles from "styles/pages/admin/report/challenges.module.scss";
import { RiDownloadLine } from "react-icons/ri";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import saveAs from "file-saver";

export default function UserListExportPage() {
  const { user, claims } = useFirebaseAuth();

  const exportUserList = async () => {
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

      fetch(`/api/admin/export/user-list`, options)
        .then((response) => response.blob())
        .then((blob) => saveAs(blob, "users.csv"));

      // setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
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
                User List Export <span className="accent green" />
              </h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <p style={{ marginTop: "3rem" }}>Download a list of all users</p>

              <a
                className={clsx("button", "green", styles.submitButton)}
                onClick={() => exportUserList()}
              >
                <RiDownloadLine
                  className={styles.reactIcon}
                  style={{
                    marginRight: 12,
                  }}
                />
                <span>Export</span>
              </a>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
