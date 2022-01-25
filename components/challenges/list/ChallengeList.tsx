import Chip from "components/common/Chip";
import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./ChallengeList.module.scss";
import ChallengeListItem, {
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
              <Col md={1}>
                <Chip color="blue">ID</Chip>
              </Col>

              <Col md={5}>
                <Chip color="purple">Title</Chip>
              </Col>

              <Col md={2}>
                <Chip color="pink">Actions</Chip>
              </Col>

              <Col md={2}>
                <Chip color="green">Created</Chip>
              </Col>

              <Col md={2}>
                <Chip color="yellow">Modified</Chip>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {items.map((item) => {
        return (
          <Row key={item.id}>
            <Col>
              <ChallengeListItem {...item} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
