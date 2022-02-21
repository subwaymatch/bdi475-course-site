import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import { JSDOM } from "jsdom";

export default function TestPage({ pyodidePackages }) {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Markdown Page</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Packages</h3>
              <p>{JSON.stringify(pyodidePackages)}</p>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const packageSourceUrl =
    "https://pyodide.org/en/stable/usage/packages-in-pyodide.html";

  interface IPyodidePackageInfo {
    name: string;
    version: string;
  }

  let text;
  let pyodidePackages: IPyodidePackageInfo[] = [];

  try {
    const response = await fetch(packageSourceUrl);
    text = await response.text();

    const dom = new JSDOM(text);

    pyodidePackages = [...dom.window.document.querySelectorAll("tbody tr")].map(
      (row) => {
        const cells = row.querySelectorAll("td");

        return {
          name: cells[0].textContent,
          version: cells[1].textContent,
        };
      }
    );
  } catch (err) {
    console.error(err);
  }

  console.log(pyodidePackages);

  return {
    props: {
      pyodidePackages,
    },
  };
}
