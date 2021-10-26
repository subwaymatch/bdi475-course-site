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
                  src="/images/notes/1630532795833.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-08-31"
              title="Variables and Data Types"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/notes/booleans-and-conditionals"
              thumbnail={
                <Image
                  src="/images/notes/1612360485433.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-02"
              title="Booleans and Conditionals"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/notes/lists-and-loops"
              thumbnail={
                <Image
                  src="/images/notes/1612807284318.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-07"
              title="Lists and Loops"
              colorTheme={ColorTheme.Pink}
            />

            <NoteItem
              href="/notes/loops-and-collections"
              thumbnail={
                <Image
                  src="/images/notes/1612973757417.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-09"
              title="Loops and Collections"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="/notes/strings-and-string-methods"
              thumbnail={
                <Image
                  src="/images/notes/1613412922600.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-14"
              title="Strings and String Methods"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/notes/functions"
              thumbnail={
                <Image
                  src="/images/notes/1614015120608.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-16"
              title="Functions Part 1"
              colorTheme={ColorTheme.Blue}
            />
            <NoteItem
              href="/notes/functions-continued"
              thumbnail={
                <Image
                  src="/images/notes/1614186667983.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-21"
              title="Functions Part 2"
              colorTheme={ColorTheme.Pink}
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
                Pandas <span className="purple accent" />
              </h2>
            </Col>
          </Row>

          <Row>
            <NoteItem
              href="https://bdi475.notion.site/Lecture-10-Intro-to-Pandas-49636dcca1f34d20963bd4fc43d567a6"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-23"
              title="Introduction to Pandas"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/20b0866414f60b83c3228f2866fe737886a1a326/L11-pandas-filtering-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-28"
              title="Pandas Filtering"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/e5fb4db0e1b2b75fbbe1bc61817648bd9629c675/L12-pandas-filtering-sorting-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-09-30"
              title="Pandas Filtering and Sorting"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/6257679c27ed493fe92cad330f61beeb5139222d/L13-pandas-columns-missing-values-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-10-05"
              title="Pandas Column Operations and Missing Values"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/0c246b3a78572609f77b653fd73533d53fa90240/L14-datetime-groupby-merge-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-10-07"
              title="Pandas Datetime, Grouping, Aggregating, Merging"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.org/github/bdi475/notebooks/blob/6739c2acdcd5ffcd13c2549c20ebde1737f44a24/L15-advanced-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-10-14"
              title="More Pandas Exercise"
              colorTheme={ColorTheme.Purple}
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
                  src="/images/notes/l17-sql.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-10-21"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="https://canvas.illinois.edu/courses/14860/assignments/339939"
              thumbnail={
                <Image
                  src="/images/notes/l17-sql.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-10-26"
              title="More SQL Queries and Aggregations"
              colorTheme={ColorTheme.Green}
            />
          </Row>

          {/*
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
              href="https://bdi475-jupyter-notebooks.netlify.app/l19-intro-to-dataviz-solution"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-04-05"
              title="Introduction to DataViz"
              colorTheme={ColorTheme.Blue}
            />
            <NoteItem
              href="https://bdi475-jupyter-notebooks.netlify.app/l20-line-bar-scatter-plots-solution"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-04-07"
              title="Line, Scatter, and Bar Plots"
              colorTheme={ColorTheme.Blue}
            />
            <NoteItem
              href="https://bdi475-jupyter-notebooks.netlify.app/l21-advanced-visualizations-solution"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-04-14"
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
              date="2021-04-19"
              title="Intro to Tableau"
              colorTheme={ColorTheme.Blue}
            />
            <NoteItem
              href="https://www.notion.so/bdi475/Lecture-23-Tableau-334bf4b89ffe4012b6b0fcb334da0178"
              thumbnail={
                <Image
                  src="/images/notes/l19-dataviz.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-04-21"
              title="Tableau Scatter Plot, Pie Chart, Geographic Map"
              colorTheme={ColorTheme.Blue}
            />
          </Row> */}
        </Container>
      </main>
    </Layout>
  );
}
