import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/NotesPage.module.scss";
import Image from "next/image";
import NoteItem from "components/pages/notes/NoteItem";
import { ColorTheme } from "types/color-theme";

export default function NotesPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className="pageTitle">Lecture Notes</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="sectionTitle">
                Python Basics <span className="purple accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="/notes/variables-and-data-types"
              thumbnail={
                <Image
                  src="/images/notes/abstract-001.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-01-20"
              title="Variables and Data Types"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/notes/booleans-and-conditionals"
              thumbnail={
                <Image
                  src="/images/notes/abstract-002.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-01-25"
              title="Operators, Booleans, and Conditionals"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/lecture-notes/lists-and-loops"
              thumbnail={
                <Image
                  src="/images/notes/abstract-003.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-01-27"
              title="Lists and Loops"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="/lecture-notes/collections-and-strings"
              thumbnail={
                <Image
                  src="/images/notes/abstract-004.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-01"
              title="Loops, Collections, Quiz Prep"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="/lecture-notes/strings-and-string-methods"
              thumbnail={
                <Image
                  src="/images/notes/abstract-005.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-03"
              title="Strings and String Methods"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/lecture-notes/functions"
              thumbnail={
                <Image
                  src="/images/notes/abstract-006.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-08"
              title="Functions Part 1"
              colorTheme={ColorTheme.Blue}
            />
          </Row>

          <Row>
            <Col>
              <h2
                className="sectionTitle"
                style={{
                  marginTop: "4rem",
                }}
              >
                Pandas <span className="orange accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/4c66be3bb966b9a58564f58b6cabbf7d6c9a82e8/L08-introduction-to-jupyter-and-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-10"
              title="Introduction to Jupyter and Pandas"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/4c66be3bb966b9a58564f58b6cabbf7d6c9a82e8/L09-pandas-series-dataframe-csv-filtering-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-15"
              title="Series, DataFrame, CSV"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/4c66be3bb966b9a58564f58b6cabbf7d6c9a82e8/L10-pandas-filtering-sorting-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-17"
              title="Pandas Filtering and Sorting"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/2f71cdaf7cdaab48817b44dc8ed1e6e47fd326cc/L11-pandas-columns-missing-values-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-22"
              title="Pandas Column Operations and Missing Values"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/2f71cdaf7cdaab48817b44dc8ed1e6e47fd326cc/L12-missing-values-datetime-aggregation-joins-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-02-24"
              title="Missing Values, Datetime, Aggregation, and Merging"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/3c6b43e4566a94e85b6b9e5d6097a33a848b8fd8/L13-aggregations-and-intro-to-merges-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-01"
              title="More Aggregations, Intro to Merges"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/3c6b43e4566a94e85b6b9e5d6097a33a848b8fd8/L14-more-pandas-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-03"
              title="Cell Operations, Advanced Exercises"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/3699e186389ba9035794008559f2a25fec1b5638/L15-hypothesis-testing-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-08"
              title="Hypothesis Testing"
              colorTheme={ColorTheme.Orange}
            />
          </Row>

          <Row>
            <Col>
              <h2
                className="sectionTitle"
                style={{
                  marginTop: "4rem",
                }}
              >
                SQL <span className="green accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/ce3b24aca031d595cb8c58ede3d43c973ad1f354/L17-intro-to-SQL-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-22"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/ce3b24aca031d595cb8c58ede3d43c973ad1f354/L18-SQL-queries-aggregations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-24"
              title="More SQL Queries and Aggregations"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/166da5e11aa44757987094d44692cd7ded635713/L19-SQL-joins-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-03-29"
              title="Basic SQL Joins"
              colorTheme={ColorTheme.Green}
            />
          </Row>

          <Row>
            <Col>
              <h2
                className="sectionTitle"
                style={{
                  marginTop: "4rem",
                }}
              >
                Data Visualization <span className="blue accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/5a7526421f6725df6b66ab7f128a9f836d4c7c65/L20-intro-to-visualizations-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-04-05"
              title="Introduction to DataViz"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/5a7526421f6725df6b66ab7f128a9f836d4c7c65/L21-line-bar-scatter-plots-vocareum-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2022-04-07"
              title="Line, Scatter, and Bar Plots"
              colorTheme={ColorTheme.Blue}
            />

            {/*
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L22-advanced-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-11-09"
              title="Advanced Visualizations"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="https://www.notion.so/bdi475/Lecture-22-Introduction-to-Tableau-15832a839f2146a59f36160bd7ce1450"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-11-11"
              title="Introduction to Tableau"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="https://bdi475.notion.site/Lecture-24-Advanced-Tableau-Visualizations-334bf4b89ffe4012b6b0fcb334da0178"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-11-16"
              title="Advanced Tableau Visualizations"
              colorTheme={ColorTheme.Blue}
            />*/}
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
