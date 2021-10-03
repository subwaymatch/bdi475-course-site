import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { IoCopy, IoLink, IoPlay } from "react-icons/io5";
import { AiFillSave } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { smallClickableVariants } from "animations/clickableVariants";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import _ from "lodash";
import styles from "./ChallengeEditorControlBar.module.scss";
import clsx from "clsx";

interface IChallengeEditorControlBarProps {
  challengeId: number;
  permalink: string;
  backUrl: string;
  title: string;
  setTitle: (v: string) => void;
  onDelete: () => void;
  clone: () => void;
  save: () => void;
}

export default function ChallengeEditorControlBar({
  challengeId,
  permalink,
  backUrl,
  title,
  setTitle,
  onDelete,
  clone,
  save,
}: IChallengeEditorControlBarProps) {
  return (
    <div className={styles.controlBar}>
      <Container fluid>
        <Row className={clsx(styles.controlRow, "align-items-center")}>
          <Col xs={4}>
            <Link href={backUrl}>
              <motion.a
                variants={smallClickableVariants}
                whileHover="hover"
                whileTap="tap"
                className={styles.backButton}
              >
                ← Back to List
              </motion.a>
            </Link>
          </Col>

          <Col xs={4}>
            <div className={styles.challengeTitleWrapper}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Challenge Title"
                className={styles.challengeTitleInput}
              />
            </div>
          </Col>

          <Col xs={4}>
            <div className={styles.controls}>
              <motion.div
                variants={smallClickableVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.save)}
                onClick={async (e) => {
                  e.preventDefault();

                  try {
                    await save();
                    toast.success("Save successful");
                  } catch (err) {
                    toast.error("Error saving challenge");
                  }
                }}
              >
                <AiFillSave className={styles.reactIcon} />
                <span className={styles.label}>Save</span>
              </motion.div>

              <motion.div
                variants={smallClickableVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.clone)}
                onClick={clone}
              >
                <VscRepoForked className={styles.reactIcon} />
                <span className={styles.label}>Clone</span>
              </motion.div>

              <CopyToClipboard
                text={challengeId}
                onCopy={() =>
                  toast.info(
                    <div>
                      Copied <code>{challengeId}</code> to clipboard
                    </div>
                  )
                }
              >
                <motion.div
                  variants={smallClickableVariants}
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

              <CopyToClipboard
                text={permalink}
                onCopy={() => toast.info("Copied permalink to clipboard")}
              >
                <motion.div
                  variants={smallClickableVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={clsx(styles.button, styles.copyLink)}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <IoLink className={styles.reactIcon} />
                  <span className={styles.label}>Copy Link</span>
                </motion.div>
              </CopyToClipboard>

              <motion.div
                variants={smallClickableVariants}
                whileHover="hover"
                whileTap="tap"
                className={clsx(styles.button, styles.delete)}
                onClick={async (e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this challenge? This cannot be undone."
                    )
                  ) {
                    await onDelete();
                  }
                }}
              >
                <MdDelete className={styles.reactIcon} />
                <span className={styles.label}>Delete</span>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
