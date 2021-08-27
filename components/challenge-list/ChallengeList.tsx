import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./ChallengeList.module.scss";
import CodingExerciseListItem, {
  IChallengeListItemProps,
} from "./ChallengeListItem";

interface IChallengeListProps {
  items: IChallengeListItemProps[];
}

export default function ChallengeList({ items }: IChallengeListProps) {
  return (
    <div className={styles.exerciseList}>
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
                <span className="label pink">Actions</span>
              </Col>

              <Col md={2}>
                <span className="label green">Created</span>
              </Col>

              <Col md={2}>
                <span className="label yellow">Modified</span>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {items.map((item) => {
        return (
          <Row key={item.qid}>
            <Col>
              <CodingExerciseListItem {...item} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
