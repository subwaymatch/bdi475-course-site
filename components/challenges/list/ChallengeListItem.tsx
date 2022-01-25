import React from "react";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { clickableVariants } from "animations/clickableVariants";
import { toast } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";
import styles from "./ChallengeListItem.module.scss";
import dayjs from "dayjs";
import Chip from "components/common/Chip";

export interface IChallengeListItemProps {
  id: string;
  permalink: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  editLink: string;
  onDelete: () => void;
}

export default function ChallengeListItem({
  id,
  permalink,
  title,
  createdAt,
  updatedAt,
  editLink,
  onDelete,
}: IChallengeListItemProps) {
  return (
    <div className={styles.listItem}>
      <Row className="align-items-center">
        <Col md={1}>
          <CopyToClipboard
            text={id}
            onCopy={() =>
              toast.info(
                <div>
                  Copied <code>{id}</code> to clipboard
                </div>
              )
            }
          >
            <motion.div
              variants={clickableVariants}
              whileHover="hover"
              whileTap="tap"
              className={clsx(styles.button, styles.cid)}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <span className={styles.idText}>{id}</span>
              <IoCopyOutline className={styles.reactIcon} />
            </motion.div>
          </CopyToClipboard>
        </Col>

        <Col md={5}>
          <Link href={editLink}>
            <a
              className={styles.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </Link>
        </Col>

        <Col md={2}>
          <div className={styles.actions}>
            <Link href={permalink}>
              <a
                className={clsx(styles.iconButton)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink className={styles.reactIcon} />
              </a>
            </Link>

            <a
              className={clsx(styles.iconButton, styles.delete)}
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <RiDeleteBin6Line className={styles.reactIcon} />
            </a>
          </div>
        </Col>

        <Col md={2}>
          <Chip className={styles.date}>
            {dayjs(createdAt).format("MMM D, YYYY")}
          </Chip>
        </Col>

        <Col md={2}>
          <Chip className={styles.date}>
            {dayjs(updatedAt).format("MMM D, YYYY")}
          </Chip>
        </Col>
      </Row>
    </div>
  );
}
