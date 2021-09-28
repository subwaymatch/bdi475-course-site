import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./ChallengeListHeader.module.scss";
import Button from "components/ui/Button";
import { ColorTheme } from "types/color-theme";
import { VscAdd } from "react-icons/vsc";

interface IChallengeListHeaderProps {
  create: () => void;
  currentPage: number;
}

export default function ChallengeListHeader({
  create,
  currentPage,
}: IChallengeListHeaderProps) {
  return (
    <div className={styles.listHeader}>
      <Row className="align-items-center">
        <Col md={4}>
          <Button
            className={styles.createButton}
            onClick={create}
            label="+ Create"
            tooltip="Create a new Python Challenge"
            colorTheme={ColorTheme.Black}
            fullWidth
          />
        </Col>

        <Col md={4}>
          <div className={styles.pageDisplay}>Page {currentPage + 1}</div>
        </Col>
      </Row>
    </div>
  );
}
