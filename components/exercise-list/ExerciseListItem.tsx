import React from "react";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { clickableVariants } from "animations/clickableVariants";
import { toast } from "react-toastify";
import { IoCopyOutline } from "react-icons/io5";
import { RiEditBoxLine, RiDeleteBin6Line } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";
import styles from "./ExerciseListItem.module.scss";
import dayjs from "dayjs";

export interface IExerciseListItemProps {
  qid: string;
  permalink: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  editLink: string;
  onDelete: () => void;
}

export default function ExerciseListItem({
  qid,
  permalink,
  title,
  createdAt,
  updatedAt,
  editLink,
  onDelete,
}: IExerciseListItemProps) {
  return (
    <div className={styles.questionListItem}>
      <Row className="align-items-center">
        <Col md={2}>
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
              className={clsx(styles.button, styles.qid)}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <span className={styles.label}>{qid}</span>
              <IoCopyOutline className={styles.reactIcon} />
            </motion.div>
          </CopyToClipboard>
        </Col>

        <Col md={4}>
          <Link href={permalink}>
            <motion.a
              variants={clickableVariants}
              whileHover="hover"
              whileTap="tap"
              className={styles.title}
            >
              {title}
            </motion.a>
          </Link>
        </Col>

        <Col md={2}>
          <div className={styles.actions}>
            <Link href={editLink}>
              <motion.a
                variants={clickableVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.iconButton, styles.edit)}
              >
                <RiEditBoxLine className={styles.reactIcon} />
              </motion.a>
            </Link>

            <motion.a
              variants={clickableVariants}
              whileHover="hover"
              whileTap="tap"
              className={clsx(styles.iconButton, styles.delete)}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <RiDeleteBin6Line className={styles.reactIcon} />
            </motion.a>
          </div>
        </Col>

        <Col md={2}>
          <span className={clsx("label", styles.timestamp)}>
            {dayjs(createdAt).format("MMM D, YYYY")}
          </span>
        </Col>

        <Col md={2}>
          <span className={clsx("label", styles.timestamp)}>
            {dayjs(updatedAt).format("MMM D, YYYY")}
          </span>
        </Col>
      </Row>
    </div>
  );
}
