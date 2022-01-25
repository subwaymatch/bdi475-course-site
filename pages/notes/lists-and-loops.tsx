import Image from "next/image";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/pages/notes/common.module.scss";
import clsx from "clsx";
import ListWithTitle from "components/common/ListWithTitle";
import CenteredColumn from "components/common/CenteredColumn";
import RecordedPythonChallengeById from "components/common/RecordedPythonChallengeById";
import LargeQuote from "components/common/LargeQuote";
import Chip from "components/common/Chip";

export default function ListsAndLoopsPage() {
  return (
    <Layout>
      <main className={styles.page}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.noteTitle}>Lists and Loops</h1>
            </Col>
          </Row>

          <ListWithTitle
            title="Objectives ⟶"
            items={[
              <>
                Review <code>if</code>, <code>elif</code>, <code>else</code>{" "}
                statements.
              </>,
              <>
                Introduce the <code>list</code> data type.
              </>,
              <>Learn how to create, access, edit a list.</>,
              <>
                Use a <code>for</code> loop to iterate over a list.
              </>,
              <>
                Use a <code>while</code> loop to iterate until a condition is
                satisfied.
              </>,
            ]}
          />

          <Row>
            <Col>
              <div className={styles.coverImage}>
                <Image
                  src="/images/notes/1612807284318.png"
                  width={3000}
                  height={2000}
                  alt=""
                />
              </div>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={178}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={1}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={179}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={22}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={180}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Introduction to Lists</h3>

            <Chip color="green">Overview</Chip>

            <p>
              The code you wrote above is great. But with a degree from the U of
              I, you will likely get more than one job offer. Assume you get
              three offers. Can you <em>reuse</em> the logic you've already
              written? Yes! But we'll first need to cover a new data type (
              <code>list</code>) and a new syntax (<code>for</code> loops).
            </p>

            <p>
              Last time, we talked about <code>bool</code>, <code>int</code>,{" "}
              <code>float</code>, and <code>str</code> types. Variables with
              these three types can only contain a single value. That&#39;s why
              they are called basic types. The <code>list</code> type is the
              first non-basic data type we&#39;ve seen. Square brackets (
              <code>[]</code>) are used to denote a list type.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={4}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={181}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={20}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Accessing list elements by index</h3>
            <Chip color="blue">Zero-based Index</Chip>
            <p>
              What does that <code>offers[0]</code> do? The square brackets used
              in <code>offers[0]</code> denote the <em>index</em> of the element
              you're trying to retrieve. <code>offers[0]</code> retrieves the
              first value in the array, which is <code>55000</code> in our code.
              But why does the index start at zero, not one?
            </p>
            <p>
              In many programming languages including Python, you start counting
              indices at zero, not one. To retrieve the second item from{" "}
              <code>my_list</code>, the correct code would be{" "}
              <code>my_list[1]</code>, not <code>my_list[2]</code>.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={183}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={182}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={34}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Negative list indices</h3>
            <Chip color="blue">From the end of the list</Chip>
            <p>
              You can also access elements from the end of the array using a
              negative index. Negative indices begin at <code>-1</code>.{" "}
              <code>my_list[-1]</code> will select the{" "}
              <strong>last element</strong> in <code>my_list</code>.
            </p>
            <p>
              Similarly, <code>my_list[-2]</code> will select the second to the
              last element in <code>my_list</code>.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={184}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={185}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>How many elements are in a list?</h3>

            <Chip color="yellow">Length of a list</Chip>
            <p>
              You can retrieve the number of items in a list by using{" "}
              <code>len(my_list)</code> syntax.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={186}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={187}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Working with lists</h3>
            <Chip color="purple">List methods</Chip>
            <p>
              Python provides multiple list methods (if you're not familiar with
              what a "method" is, think of it as some operation on a list - like
              adding or removing an item).
            </p>

            <p>
              A common operation is to add an item to an existing list. You can
              append an item to a list using{" "}
              <code>my_list.append(new_value)</code> syntax.
            </p>

            <p>
              If you'd like to take a look at all available methods, refer to{" "}
              <a href="https://docs.python.org/3/tutorial/datastructures.html">
                https://docs.python.org/3/tutorial/datastructures.html
              </a>
              .
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={188}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Can a list have elements with non-uniform data types?</h3>
            <Chip color="pink">Mixed Types</Chip>
            <p>
              From the previous coding question, we're able to see that a list
              can have elements with mixed data types. A list can hold{" "}
              <strong>any</strong> data type. In fact, a list can hold another
              list, which is called a{" "}
              <em className="color-purple">nested list</em>. For now, let's keep
              it simple and not worry about nested lists.
            </p>
          </CenteredColumn>

          <LargeQuote className={styles.block}>
            <p>
              A list can contain a list that contains another list that contains
              another list... and so on.
            </p>
          </LargeQuote>

          <RecordedPythonChallengeById
            challengeId={29}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={28}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Do we really want to keep copy-pasting stuff?</h3>

            <Chip color="purple">Nope</Chip>
            <p>
              Well that's a little inefficient, isn't it? You may be okay with
              copy-pasting the <code>print(roster[n])</code> code a couple of
              times. But imagine if the <code>roster</code> list had 1,000
              names. You'd be spending your entire afternoon copy-pasting and
              changing numbers.
            </p>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={35}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={189}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={21}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={30}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={39}
            className={styles.block}
          />

          <CenteredColumn className={styles.textBox}>
            <h3>Another way to retrieve elements</h3>

            <Chip color="orange">A second syntax</Chip>
            <p>
              You can also use <code>for x in my_list</code> to iterate over
              each value in <code>my_list</code>. Note that <code>x</code> is an
              arbitrary name you pick. You can use any name. Any of the code
              below will work.
            </p>

            <ul>
              <li>
                <code>for x in my_list</code>
              </li>
              <li>
                <code>for a in my_list</code>
              </li>
              <li>
                <code>for my_value in my_list</code>
              </li>
              <li>
                <code>for any_variable_name in my_list</code>
              </li>
            </ul>
          </CenteredColumn>

          <RecordedPythonChallengeById
            challengeId={26}
            className={styles.block}
          />

          <Row className={clsx(styles.boxItems)}>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
              <h2 className="sectionTitle">
                Two types of loops
                <span className="accent purple" />
              </h2>

              <Row>
                <Col md={6}>
                  <div className={styles.item}>
                    <Chip color="blue">For Loops</Chip>

                    <p>
                      You must supply a <code>list</code>-like data to{" "}
                      <code>for</code>...<code>in</code> loops. Python will
                      iterate over each{" "}
                      <span className="color-blue">value</span> in the supplied
                      <code>list</code>-like data.
                    </p>
                  </div>
                </Col>

                <Col md={6}>
                  <div className={styles.item}>
                    <Chip color="green">While Loops</Chip>

                    <p>
                      A <code>while</code> loop will continue to run until a
                      specific condition is satisfied. Without satisfying the
                      exit condition, your loop will run{" "}
                      <strong>forever</strong>.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <RecordedPythonChallengeById
            challengeId={40}
            className={styles.block}
          />

          <RecordedPythonChallengeById
            challengeId={37}
            className={styles.block}
          />
        </Container>
      </main>
    </Layout>
  );
}
