import React from "react";
import Link from "next/link";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./QuestionList.module.scss";

type QuestionListProps = {
  questionDataList: any;
};

export default function QuestionList({ questionDataList }: QuestionListProps) {
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

      {(questionDataList as any).map((q) => {
        return (
          <Row>
            <Col>
              <Row>
                <Col md={2}>Question ID</Col>

                <Col md={4}>Title</Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
