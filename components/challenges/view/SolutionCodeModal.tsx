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

enum RequestStatusEnum {
  LOADING,
  SUCCESS,
  ERROR,
}

interface ISolutionCodeModal {
  isOpen: boolean;
  onClose: () => void;
  cid: number;
  language: string;
}

export default function SolutionCodeModal({
  isOpen,
  onClose,
  cid,
  language,
}: ISolutionCodeModal) {
  const { user } = useSupabaseAuth();
  const [status, setStatus] = useState(RequestStatusEnum.LOADING);
  const [solutionCode, setSolutionCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { session } = useSupabaseAuth();

  const getSolutionCode = async () => {
    setStatus(RequestStatusEnum.LOADING);

    try {
      const fetchResult = await fetch(`/api/coding-challenge/${cid}/solution`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await fetchResult.json();

      console.log(data);

      setSolutionCode((data as any).solutionCode);
      setStatus(RequestStatusEnum.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(RequestStatusEnum.ERROR);
      setErrorMessage(err.message);

      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      getSolutionCode();
    }
  }, [isOpen, user]);

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
          top: "80px",
          left: "80px",
          right: "80px",
          bottom: "80px",
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
          <SyntaxHighlighter
            language={language}
            style={materialDark}
            customStyle={{
              fontSize: "1.2rem",
              border: "none",
              borderRadius: 0,
              margin: 0,
              padding: "1rem 1.25rem",
            }}
            wrapLongLines={true}
          >
            {status === RequestStatusEnum.SUCCESS ? solutionCode : "# Loading"}
          </SyntaxHighlighter>
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
