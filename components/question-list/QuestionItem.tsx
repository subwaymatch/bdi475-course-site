import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import { toast } from "react-toastify";
import { IoCopy, IoLink } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";

import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";
import styles from "./QuestionItem.module.scss";
import dayjs from "dayjs";

export interface QuestionItemProps {
  qid: string;
  permalink: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  onDelete: () => void;
}

export default function QuestionItem({
  qid,
  permalink,
  title,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: QuestionItemProps) {
  console.log(`questionItem qid=${qid}`);

  return (
    <Row className="align-items-center">
      <Col md={2}>
        <Link href={`/coding-question/view/${qid}`}>{qid}</Link>

        <CopyToClipboard
          text={qid}
          onCopy={() =>
            toast.info(
              <div>
                Copied <code>{qid}</code> to clipboard
              </div>
            )
          }
        >
          <motion.div
            variants={clickableVariants}
            whileHover="hover"
            whileTap="tap"
            className={clsx(styles.button, styles.copyId)}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <IoCopy className={styles.reactIcon} />
            <span className={styles.label}>Copy ID</span>
          </motion.div>
        </CopyToClipboard>
      </Col>

      <Col md={4}>
        <Link href={`/coding-question/view/${qid}`}>
          <div className={styles.title}>{title}</div>
        </Link>
      </Col>

      <Col md={2}>
        <div className={styles.timestamp}>
          {dayjs(createdAt).format("MMM D, YYYY")}
        </div>
      </Col>

      <Col md={2}>
        <div className={styles.timestamp}>
          {dayjs(updatedAt).format("MMM D, YYYY")}
        </div>
      </Col>

      <Col md={2}>
        <div className={styles.actions}>
          <Link href={`/coding-question/edit/${qid}`}>
            <div className={styles.iconButton}>
              <RiEditBoxLine className={styles.reactIcon} />
            </div>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
