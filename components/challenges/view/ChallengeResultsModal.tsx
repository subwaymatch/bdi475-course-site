import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styles from "./SolutionCodeModal.module.scss";
import _ from "lodash";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "react-toastify";
import Chip from "components/common/Chip";
import { useMediaQuery } from "@mui/material";
import { md } from "constants/media-query-strings";

enum RequestStatusEnum {
  LOADING,
  SUCCESS,
  ERROR,
}

interface IChallengeResultsModal {
  isOpen: boolean;
  onClose: () => void;
  cid: number;
  language: string;
}

export default function ChallengeResultsModal({
  isOpen,
  onClose,
  cid,
  language,
}: IChallengeResultsModal) {
  const { user } = useSupabaseAuth();
  const [status, setStatus] = useState(RequestStatusEnum.LOADING);
  const [solutionCode, setSolutionCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { session } = useSupabaseAuth();

  const isMdBreakpoint = useMediaQuery(md);

  const handleClose = async () => {
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: isMdBreakpoint ? "40px" : "80px",
          left: isMdBreakpoint ? "40px" : "80px",
          right: isMdBreakpoint ? "40px" : "80px",
          bottom: isMdBreakpoint ? "40px" : "80px",
          backgroundColor: "#2f2f2f",
          border: "none",
          padding: "16px",
        },
      }}
      ariaHideApp={false}
      closeTimeoutMS={200}
      onRequestClose={handleClose}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Row className="g-0">
            <Col>
              <Chip color="orange" small>
                Solution Code
              </Chip>
            </Col>
          </Row>
        </div>

        <div className={styles.modalBody}>
          {status === RequestStatusEnum.SUCCESS ? solutionCode : "# Loading"}
        </div>

        <div className={styles.modalFooter}>
          <button
            onClick={handleClose}
            className={clsx(styles.closeButton, styles.button)}
          >
            <CgClose className={styles.reactIcon} />
            <span className={styles.label}>Close</span>
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
