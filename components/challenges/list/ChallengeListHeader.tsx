import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./ChallengeListHeader.module.scss";
import clsx from "clsx";
import { CgAddR } from "react-icons/cg";
import { AiOutlineNumber } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";

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
      <Row className={clsx("align-items-center", "g-0")}>
        <Col md={6}>
          <Tippy
            key="create-button"
            content="Create a new challenge"
            className="tippy"
            placement="bottom"
            theme="light"
          >
            <div className={styles.createButton} onClick={create}>
              <MdOutlineAddCircle className={styles.reactIcon} />
              <span className={styles.label}>Create</span>
            </div>
          </Tippy>
        </Col>

        <Col md={6}>
          <div className={styles.pageDisplay}>
            <AiOutlineNumber className={styles.reactIcon} />
            <span>Page {currentPage + 1}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
