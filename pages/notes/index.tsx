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
        <Container fluid>
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
              href="/lecture-notes/intro-to-analytics"
              thumbnail={
                <Image
                  src="/images/notes/abstract-005.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-01-19"
              title="Intro to Analytics"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/lecture-notes/intro-to-python"
              thumbnail={
                <Image
                  src="/images/notes/abstract-006.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-01-19"
              title="Intro to Python"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="/lecture-notes/data-types-and-variables"
              thumbnail={
                <Image
                  src="/images/notes/abstract-001.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-01-19"
              title="Data Types and Variables"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/lecture-notes/booleans-and-conditionals"
              thumbnail={
                <Image
                  src="/images/notes/abstract-002.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-01-24"
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
              date="2023-01-26"
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
              date="2023-01-31"
              title="Collections and Strings"
              colorTheme={ColorTheme.Purple}
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
              date="2023-02-02"
              title="Functions"
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
              href="https://nbviewer.org/github/bdi475/notebooks/blob/7fe9fb6559b012d26d34f21234aa6b506fcb261a/L07-introduction-to-jupyter-and-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-07"
              title="Introduction to Jupyter and Pandas"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/7fe9fb6559b012d26d34f21234aa6b506fcb261a/L08-pandas-filtering-and-sorting-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-09"
              title="Pandas Filtering and Sorting"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/45cd2d94aabf112355b16283127ad3f26968d1a3/L09-pandas-column-operations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-14"
              title="Pandas Data Types and Column Operations"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/45cd2d94aabf112355b16283127ad3f26968d1a3/L10-missing-values-datetime-aggregation-joins-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-16"
              title="Missing Values, Datetime, Aggregation, and Merges"
              colorTheme={ColorTheme.Orange}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/2319edbc5bfe5730d83cc11a0b1b4e1123333e77/L11-pandas-update-cells-more-exercises-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-21"
              title="Update Cells, More Exercises"
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
              href="https://nbviewer.org/github/bdi475/notebooks/blob/b685b79ab094e9432700785a57211199c5d3788b/L13-intro-to-SQL-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-02-28"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/b685b79ab094e9432700785a57211199c5d3788b/L14-SQL-queries-aggregations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-03-02"
              title="More SQL Queries and Aggregations"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/b685b79ab094e9432700785a57211199c5d3788b/L15-SQL-joins-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/sql-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-03-07"
              title="SQL Joins"
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
              href="https://nbviewer.org/github/bdi475/notebooks/blob/10c3cc373456dabc254cd5e618ba839c1698b6ba/L21-intro-to-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-04-04"
              title="Introduction to DataViz"
              colorTheme={ColorTheme.Blue}
            />
            {/* 
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/01a3cd4136f3a8a8a7d4aca73d4bdc7aae888b79/L22-line-bar-scatter-plots-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-11-03"
              title="Line, Scatter, and Bar Plots"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/01a3cd4136f3a8a8a7d4aca73d4bdc7aae888b79/L23-advanced-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-11-10"
              title="Advanced Plotly Visualizations"
              colorTheme={ColorTheme.Blue}
            />
            
            <NoteItem
              href="https://www.notion.so/bdi475/Lecture-22-Introduction-to-Tableau-15832a839f2146a59f36160bd7ce1450"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-04-19"
              title="Introduction to Tableau"
              colorTheme={ColorTheme.Blue}
            />

            <NoteItem
              href="https://bdi475.notion.site/Lecture-24-Advanced-Tableau-Visualizations-334bf4b89ffe4012b6b0fcb334da0178"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2023-04-21"
              title="Advanced Tableau Visualizations"
              colorTheme={ColorTheme.Blue}
            /> */}
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
