import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/NotesPage.module.scss";
import Image from "next/image";
import NoteItem from "components/pages/notes/NoteItem";
import { ColorTheme } from "typings/color-theme";

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
                  src="/images/notes/1612359825610.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-02-01"
              title="Variables and Data Types"
              colorTheme={ColorTheme.Green}
            />

            <NoteItem
              href="/notes/booleans-and-conditional-logic"
              thumbnail={
                <Image
                  src="/images/notes/1612360485433.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-02-03"
              title="Booleans and Conditional Logic"
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
              date="2021-02-08"
              title="Lists and Loops"
              colorTheme={ColorTheme.Pink}
            />

            <NoteItem
              href="/notes/while-loops-and-collections"
              thumbnail={
                <Image
                  src="/images/notes/1612973757417.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-02-10"
              title="While Loops and Collections"
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
              date="2021-02-15"
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
              date="2021-02-22"
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
              date="2021-02-24"
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
              href="https://www.notion.so/bdi475/Lecture-11-Intro-to-Pandas-49636dcca1f34d20963bd4fc43d567a6"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-03"
              title="Introduction to Pandas"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/e8ce4de7ad280c9286a6bd51b8dfeb492298db59/L11-pandas-solution.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-08"
              title="Pandas Filter"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/main/L13-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-10"
              title="More Pandas Filter"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/48d75746b6367c574cd9787af02e6692193a5b54/L14-working-with-pandas-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-15"
              title="Pandas Sort, Rename/Drop/Select Columns"
              colorTheme={ColorTheme.Purple}
            />

            <NoteItem
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/5297a19ee6dc57b6df55b4550c3df54bbbe48101/L15-datetime-groupby-stats-SOLUTION.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l11-pandas.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-17"
              title="Pandas Datetime, Grouping and Aggregating Data"
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
              href="https://nbviewer.jupyter.org/github/bdi475/notebooks/blob/b40fc7a921bb2497fa24e1dce4b663b14d2173f9/L17-intro-to-SQL.ipynb"
              thumbnail={
                <Image
                  src="/images/notes/l17-sql.png"
                  width={900}
                  height={600}
                  alt=""
                />
              }
              date="2021-03-29"
              title="Introduction to SQL"
              colorTheme={ColorTheme.Green}
            />
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
