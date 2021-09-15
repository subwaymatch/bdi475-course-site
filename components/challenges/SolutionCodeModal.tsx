import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styles from "./SolutionCodeModal.module.scss";
import _ from "lodash";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { definitions } from "types/database";
import { supabaseClient } from "lib/supabase/supabaseClient";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
  const [solutionData, setSolutionData] =
    useState<definitions["coding_challenge_solutions"]>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getSolutionCode = async () => {
    setStatus(RequestStatusEnum.LOADING);

    const { data, error } = await supabaseClient
      .from<definitions["coding_challenge_solutions"]>(
        "coding_challenge_solutions"
      )
      .select()
      .eq("challenge_id", cid)
      .single();

    if (error) {
      console.error(error);
      setStatus(RequestStatusEnum.ERROR);
      setErrorMessage(error.message);
    } else {
      setSolutionData(data);
      setStatus(RequestStatusEnum.SUCCESS);
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
      onRequestClose={handleClose}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Row className="g-0">
            <Col>
              <span className="label orange small whiteText">
                Solution Code
              </span>
            </Col>
          </Row>
        </div>

        <div className={styles.modalBody}>
          <SyntaxHighlighter
            language="python"
            style={materialDark}
            customStyle={{
              fontSize: "1.2rem",
              border: "none",
              borderRadius: 0,
              margin: 0,
              padding: "1rem 1.25rem",
            }}
            wrapLines={true}
          >
            {status === RequestStatusEnum.SUCCESS
              ? solutionData.solution_code
              : "# Loading"}
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
