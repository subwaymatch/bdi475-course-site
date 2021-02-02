import React from "react";
import router from "next/router";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import styles from "./QuestionList.module.scss";
import QuestionItem from "./QuestionItem";

interface QuestionListProps {
  questionSummaryList: {
    qid: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export default function QuestionList({
  questionSummaryList: questionDataList,
}: QuestionListProps) {
  console.log(questionDataList);

  return (
    <>
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

      {questionDataList.map((q) => {
        return (
          <Row key={q.qid}>
            <Col>
              <QuestionItem
                qid={q.qid as string}
                permalink={`/coding-question/view/${q.qid}`}
                title={q.title as string}
                createdAt={q.createdAt}
                updatedAt={q.updatedAt}
                onDelete={() => {}}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
}
