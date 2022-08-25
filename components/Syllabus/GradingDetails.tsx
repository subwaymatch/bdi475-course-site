import styles from "./GradingDetails.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import Chip from "components/common/Chip";

const GradingComponentDetails = () => (
  <div className={styles.gradingComponentDetails}>
    <h2 className="sectionTitle">
      Grading Components <span className="accent green" />
    </h2>

    <div className={clsx(styles.componentBox, styles.first)}>
      <span className={styles.number}>1</span>
      <h3>Participation</h3>

      <p className={styles.text}>
        Your participation grades are based on two criteria – 1){" "}
        <strong>participation in in-class exercises</strong> and 2){" "}
        <strong>participation in discussions in class</strong>. Your
        participation grades are purely subjective. Over the course of the
        semester, I will observe who speaks up in classes, who helps their
        classmates, and who puts in efforts on in-class exercises. I will reward
        the <strong>quality</strong>, not quantity of participation.
      </p>
    </div>

    <div className={styles.componentBox}>
      <span className={styles.number}>2</span>
      <h3>After-class Exercises</h3>

      <p className={styles.text}>
        These exercises aim to reinforce your understanding of topics we discuss
        in lectures. The challenges are highly similar to the ones you see in
        lectures. You will get an unlimited number of attempts.
      </p>
    </div>

    <div className={styles.componentBox}>
      <span className={styles.number}>3</span>
      <h3>Quizzes</h3>

      <p className={styles.text}>
        Each of the 5 quizzes will test your understanding of the topics we
        discuss in lectures. All quizzes are open-book. The lowest quiz score
        will be dropped.
      </p>
    </div>

    <div className={styles.componentBox}>
      <span className={styles.number}>4</span>
      <h3>Problem Sets</h3>

      <p className={styles.text}>
        Similar to after-class exercises, each problem set is consisted of
        coding challenges. These challenges will be closely related to business
        applications. Consider these a preview of the case studies. 🦜
      </p>
    </div>

    <div className={styles.componentBox}>
      <span className={styles.number}>5</span>
      <h3>Case Studies</h3>

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
      <span className={styles.number}>6</span>
      <h3>Capstone Project</h3>

      <p className={styles.text}>
        During the last few weeks of this course, you will work on an
        independent capstone project. The goal is to create a portfolio that
        showcases your data analytic skills.
      </p>
    </div>
  </div>
);

const LetterGradeRange = () => (
  <div className={styles.letterGradeRange}>
    <h2 className="sectionTitle">
      Letter Grades
      <span className="accent blue" />
    </h2>

    <div className={styles.header}>
      <Row>
        <Col>
          <Chip color="blue">% Range</Chip>
        </Col>
        <Col>
          <Chip color="blue">Letter Grade</Chip>
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
      <Container fluid>
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
