import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import { toast } from "react-toastify";
import { IoCopy, IoLink } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";
import styles from "./QuestionItem.module.scss";

interface QuestionItemProps {
  qid: string;
  permalink: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  onEdit: () => {};
  onDelete: () => {};
}

export default function QuestionItem({
  qid,
  permalink,
  title,
  createdAt,
  modifiedAt,
  onEdit,
  onDelete,
}: QuestionItemProps) {
  return (
    <Row>
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
    </Row>
  );
}
