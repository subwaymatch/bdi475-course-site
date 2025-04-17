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
              date="2025-01-23"
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
              date="2025-01-23"
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
              date="2025-01-23"
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
              date="2025-01-28"
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
              date="2025-01-30"
              title="Lists and Loops"
              colorTheme={ColorTheme.Blue}
              show={true}
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
              date="2025-02-04"
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
              date="2025-02-06"
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
              date="2025-02-11"
              title="Introduction to Jupyter and Pandas"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L08-pandas-filtering-and-sorting-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-02-13"
              title="Pandas Filtering and Sorting"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L09-pandas-column-operations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-02-18"
              title="Pandas Data Types and Column Operations"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L10-missing-values-datetime-aggregation-joins-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-02-20"
              title="Missing Values, Datetime, Aggregation, and Merges"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L11-pandas-update-cells-more-exercises-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-02-25"
              title="Update Cells, More Exercises"
              colorTheme={ColorTheme.Orange}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L12-pandas-merge-string-methods-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/pandas-gray-bg.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-02-27"
              title="Merge and String Methods"
              colorTheme={ColorTheme.Orange}
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
              date="2025-03-04"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
              show={true}
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
              date="2025-03-06"
              title="More SQL Queries and Aggregations"
              colorTheme={ColorTheme.Green}
              show={true}
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
              date="2025-03-11"
              title="SQL Joins"
              colorTheme={ColorTheme.Green}
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
                Data Visualization <span className="blue accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L20-intro-to-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-04-03"
              title="Introduction to DataViz"
              colorTheme={ColorTheme.Blue}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L21-line-bar-scatter-plots-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-04-08"
              title="Line, Scatter, and Bar Plots"
              colorTheme={ColorTheme.Blue}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/main/L22-advanced-visualizations-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-04-10"
              title="Advanced Plotly Visualizations"
              colorTheme={ColorTheme.Blue}
              show={true}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/2340c9e6f6a76b62b1dcd6bb755af52da4f7f854/L23-in-class-dataviz-challenges-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/dataviz.png"
                  width={900}
                  height={450}
                  alt=""
                />
              }
              date="2025-04-15"
              title="In-class DataViz Challenge Day"
              colorTheme={ColorTheme.Blue}
              show={true}
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
              date="2025-04-17"
              title="Introduction to Tableau"
              colorTheme={ColorTheme.Blue}
              show={true}
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
              date="2025-04-22"
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
              date="2025-04-29"
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
              date="2025-05-01"
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
