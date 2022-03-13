import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import styles from "./PlaygroundTopBar.module.scss";
import { useSnapshot } from "valtio";
import pythonPlaygroundState from "stores/pythonPlaygroundState";
import clsx from "clsx";
import { UseMeasureRef } from "react-use/lib/useMeasure";

interface IPlaygroundTopBarProps {
  topBarRef: UseMeasureRef<Element>;
  snippetId: string;
  handleDelete: () => void;
  clone: () => void;
  save: (displayToast?: boolean) => void;
}

export default function PlaygroundTopBar({
  topBarRef,
  snippetId,
  handleDelete: onDelete,
  clone,
  save,
}: IPlaygroundTopBarProps) {
  const snap = useSnapshot(pythonPlaygroundState);

  return (
    <div className={styles.topBar} ref={topBarRef}>
      <Container fluid>
        <Row className={clsx(styles.controlRow, "align-items-center")}>
          <Col xs={4}>
            Back
            {/* <Link href={backUrl}>
              <a className={styles.backButton}>← Back to List</a>
            </Link> */}
          </Col>

          <Col xs={4}>
            <div className={styles.snippetTitleWrapper}>
              <input
                type="text"
                value={snap.title}
                onChange={(e) => {
                  pythonPlaygroundState.title = e.target.value;
                }}
                placeholder="Snippet Title"
                className={styles.snippetTitleInput}
              />
            </div>
          </Col>

          <Col xs={4}>
            <div className={styles.controls}>
              <div
                className={clsx(styles.button, styles.save)}
                onClick={() => save()}
              >
                <AiFillSave className={styles.reactIcon} />
                <span className={styles.label}>Save</span>
              </div>

              <div
                className={clsx(styles.button, styles.clone)}
                onClick={clone}
              >
                <VscRepoForked className={styles.reactIcon} />
                <span className={styles.label}>Clone</span>
              </div>

              <div
                className={clsx(styles.button, styles.delete)}
                onClick={async (e) => {
                  e.preventDefault();
                  if (
                    window.confirm(
                      "Are you sure you want to delete this snippet? This cannot be undone."
                    )
                  ) {
                    await onDelete();
                  }
                }}
              >
                <MdDelete className={styles.reactIcon} />
                <span className={styles.label}>Delete</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
