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
              date="2024-01-18"
              title="Intro to Analytics"
              colorTheme={ColorTheme.Green}
              show={true}
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
              date="2024-01-18"
              title="Intro to Python"
              colorTheme={ColorTheme.Blue}
              show={true}
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
              date="2024-01-18"
              title="Data Types and Variables"
              colorTheme={ColorTheme.Green}
              show={true}
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
              date="2024-01-23"
              title="Operators, Booleans, and Conditionals"
              colorTheme={ColorTheme.Green}
              show={true}
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
              date="2024-01-25"
              title="Lists and Loops"
              colorTheme={ColorTheme.Blue}
              show={false}
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
              date="2024-01-30"
              title="Collections and Strings"
              colorTheme={ColorTheme.Purple}
              show={true}
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
              date="2024-02-01"
              title="Functions"
              colorTheme={ColorTheme.Blue}
              show={true}
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
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L07-introduction-to-jupyter-and-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-02-06"
              title="Introduction to Jupyter and Pandas"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/5c2a12580718902da8168c0e191e57f922a5c2b8/L08-pandas-filtering-and-sorting-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-02-08"
              title="Pandas Filtering and Sorting"
              colorTheme={ColorTheme.Orange}
              show={false}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/5c2a12580718902da8168c0e191e57f922a5c2b8/L09-pandas-column-operations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-02-13"
              title="Pandas Data Types and Column Operations"
              colorTheme={ColorTheme.Orange}
              show={false}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/725c653f4c4822fbe1a6182e1500843528be6d71/L10-missing-values-datetime-aggregation-joins-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-02-15"
              title="Missing Values, Datetime, Aggregation, and Merges"
              colorTheme={ColorTheme.Orange}
              show={false}
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
              date="2024-02-20"
              title="Update Cells, More Exercises"
              colorTheme={ColorTheme.Orange}
              show={false}
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
              date="2024-02-27"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
              show={false}
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
              date="2024-02-29"
              title="More SQL Queries and Aggregations"
              colorTheme={ColorTheme.Green}
              show={false}
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
              date="2024-03-05"
              title="SQL Joins"
              colorTheme={ColorTheme.Green}
              show={false}
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
              href="https://nbviewer.org/github/bdi475/notebooks/blob/7d5ad1b6038f4840ff4856123b94326a5448ab30/L20-intro-to-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-03-28"
              title="Introduction to DataViz"
              colorTheme={ColorTheme.Blue}
              show={false}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/7d5ad1b6038f4840ff4856123b94326a5448ab30/L21-line-bar-scatter-plots-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-02"
              title="Line, Scatter, and Bar Plots"
              colorTheme={ColorTheme.Blue}
              show={false}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/7d5ad1b6038f4840ff4856123b94326a5448ab30/L22-advanced-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-04"
              title="Advanced Plotly Visualizations"
              colorTheme={ColorTheme.Blue}
              show={false}
            />

            <NoteItem
              href="https://bdi475.notion.site/Lecture-24-Introduction-to-Tableau-15832a839f2146a59f36160bd7ce1450"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-11"
              title="Introduction to Tableau"
              colorTheme={ColorTheme.Blue}
              show={false}
            />

            <NoteItem
              href="https://bdi475.notion.site/Lecture-25-Advanced-Tableau-Visualizations-334bf4b89ffe4012b6b0fcb334da0178"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-16"
              title="Advanced Tableau Visualizations"
              colorTheme={ColorTheme.Blue}
              show={false}
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
                Final Case Study <span className="blue accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/case-study-06-clean-data.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-25"
              title="Cleaning and Concatenating Data Files"
              colorTheme={ColorTheme.Blue}
              show={false}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/57847e1e6cc62d7808984506fd9f9cbb7d18169e/case-study-06-NLP.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2024-04-30"
              title="Natural Language Processing"
              colorTheme={ColorTheme.Blue}
              show={false}
            />
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
