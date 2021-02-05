import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./QuestionList.module.scss";
import QuestionListItem, { QuestionListItemProps } from "./QuestionListItem";

interface QuestionListProps {
  items: QuestionListItemProps[];
}

export default function QuestionList({ items }: QuestionListProps) {
  return (
    <div className={styles.questionList}>
      <Row>
        <Col>
          <div className={styles.headerRow}>
            <Row>
              <Col md={2}>
                <span className="label blue">Question ID</span>
              </Col>

              <Col md={4}>
                <span className="label purple">Title</span>
              </Col>

              <Col md={2}>
                <span className="label green">Created</span>
              </Col>

              <Col md={2}>
                <span className="label yellow">Modified</span>
              </Col>

              <Col md={2}>
                <span className="label pink">Actions</span>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {items.map((item) => {
        return (
          <Row key={item.qid}>
            <Col>
              <QuestionListItem {...item} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
