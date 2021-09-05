import styles from "./GradingDetails.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";

const GradingComponentDetails = () => (
  <div className={styles.gradingComponentDetails}>
    <h2 className="sectionTitle">
      Grading Components <span className="accent yellow" />
    </h2>

    <div className={clsx(styles.componentBox, styles.first)}>
      <h3>
        <span className={styles.title}>Participation</span>
        <span className={styles.number}>1</span>
      </h3>

      <p className={styles.text}>
        During the live lectures, you will work on coding exercises. Your
        participation is measured by a mix of the correctness and efforts in
        those exercises. It's perfectly okay to get a few questions wrong. 🤠
      </p>
    </div>

    <div className={styles.componentBox}>
      <h3>
        <span className={styles.title}>After-class Exercises</span>
        <span className={styles.number}>2</span>
      </h3>

      <p className={styles.text}>
        These exercises aim to reinforce your understanding of topics we discuss
        in lectures. 🐌 The challenges are highly similar to the ones you see in
        lectures. You will get an unlimited number of attempts.
      </p>
    </div>

    <div className={styles.componentBox}>
      <h3>
        <span className={styles.title}>Quizzes</span>
        <span className={styles.number}>3</span>
      </h3>

      <p className={styles.text}>
        Each quiz will test your understanding of the topics we discuss in
        lectures. All quizzes are{" "}
        <span className="color-green w-500">open note and open search</span>{" "}
        (able to search). However, no P2P discussions are allowed.
      </p>
    </div>

    <div className={styles.componentBox}>
      <h3>
        <span className={styles.title}>Problem Sets</span>
        <span className={styles.number}>4</span>
      </h3>

      <p className={styles.text}>
        Similar to after-class exercises, each problem set is consisted of
        coding challenges. These challenges will be closely related to business
        applications. Consider these a preview of the case studies. 🦜
      </p>
    </div>

    <div className={styles.componentBox}>
      <h3>
        <span className={styles.title}>Case Studies</span>
        <span className={styles.number}>5</span>
      </h3>

      <p className={styles.text}>
        Case studies will bring together all topics we discuss in lectures. You
        will work with real-world datasets to load, clean, transform, and derive
        insights. Unlike the previous coding challenges, you will complete these
        case studies in a Jupyter notebook environment (e.g.,{" "}
        <a href="https://jupyter.org/">JupyterLab</a>,{" "}
        <a href="https://colab.google.com">Google Colab</a>,{" "}
        <a href="https://jupyterlite.rtfd.io/en/latest/try/lab">JupyterLite</a>
        ).
      </p>
    </div>
    <div className={styles.componentBox}>
      <h3>
        <span className={styles.title}>Capstone Project</span>
        <span className={styles.number}>6</span>
      </h3>

      <p className={styles.text}>
        During the last few weeks of this course, you will work on an
        independent capstone project. The goal is to create a portfolio that
        showcases your data analytic skills. To encourage
      </p>
    </div>
  </div>
);

const LetterGradeRange = () => (
  <div className={styles.letterGradeRange}>
    <h2 className="sectionTitle">
      Letter Grades
      <span className="accent green" />
    </h2>

    <div className={styles.header}>
      <Row>
        <Col>
          <span className="label green">% Range</span>
        </Col>
        <Col>
          <span className="label purple">Letter Grade</span>
        </Col>
      </Row>
    </div>

    <div className={clsx(styles.letterBox, styles.A)}>
      <div className={clsx(styles.item, styles.first)}>
        <Row>
          <Col>
            <span className={styles.range}>97 - 100%</span>
          </Col>
          <Col>
            <span className={styles.letter}>A+</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>93 - 96.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>A</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>90 - 92.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>A-</span>
          </Col>
        </Row>
      </div>
    </div>

    <div className={clsx(styles.letterBox, styles.B)}>
      <div className={clsx(styles.item, styles.first)}>
        <Row>
          <Col>
            <span className={styles.range}>87 - 89.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>B+</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>83 - 86.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>B</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>80 - 82.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>B-</span>
          </Col>
        </Row>
      </div>
    </div>

    <div className={clsx(styles.letterBox, styles.C)}>
      <div className={clsx(styles.item, styles.first)}>
        <Row>
          <Col>
            <span className={styles.range}>77 - 79.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>C+</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>73 - 76.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>C</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>70 - 72.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>C-</span>
          </Col>
        </Row>
      </div>
    </div>

    <div className={clsx(styles.letterBox, styles.D)}>
      <div className={clsx(styles.item, styles.first)}>
        <Row>
          <Col>
            <span className={styles.range}>67 - 69.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>D+</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>63 - 66.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>D</span>
          </Col>
        </Row>
      </div>

      <div className={styles.item}>
        <Row>
          <Col>
            <span className={styles.range}>60 - 62.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>D-</span>
          </Col>
        </Row>
      </div>
    </div>

    <div className={clsx(styles.letterBox, styles.F)}>
      <div className={clsx(styles.item, styles.first)}>
        <Row>
          <Col>
            <span className={styles.range}>0 - 59.9%</span>
          </Col>
          <Col>
            <span className={styles.letter}>F</span>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);

export default function GradingDetails() {
  return (
    <div className={styles.gradingDetails}>
      <Container>
        <Row>
          <Col lg={8} xs={12}>
            <GradingComponentDetails />
          </Col>

          <Col lg={4} xs={12}>
            <LetterGradeRange />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
