import { useEffect, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import ReactModal from "react-modal";
import styles from "./FormatterDiffModal.module.scss";
import customTheme from "../CodeEditor/custom-light-theme.json";
import cloneDeep from "lodash/cloneDeep";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { BiShapeTriangle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Chip from "components/common/Chip";

enum CodeFormatStatusEnum {
  LOADING,
  SUCCESS,
  ERROR,
}

interface IFormatterDiffModal {
  isOpen: boolean;
  onAccept: (v: string) => void;
  onClose: () => void;
  original: string;
  language: string;
}

export default function FormatterDiffModal({
  isOpen,
  onAccept,
  onClose,
  original,
  language,
}: IFormatterDiffModal) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // loading, success, error
  const [status, setStatus] = useState(CodeFormatStatusEnum.LOADING);
  const [formattedCode, setFormattedCode] = useState("");

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("CustomTheme", customTheme);
    setIsThemeLoaded(true);
  };

  const formatCode = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BLACK_LAMBDA_ENDPOINT,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: original,
        }),
      }
    );

    const formatResult = await response.json();

    setFormattedCode(formatResult.formatted_code);
    setStatus(CodeFormatStatusEnum.SUCCESS);
  };

  useEffect(() => {
    if (isOpen) {
      formatCode();
    }
  }, [isOpen]);

  const handleAccept = async () => {
    if (status === CodeFormatStatusEnum.SUCCESS) {
      await onAccept(cloneDeep(formattedCode));
    } else {
      onClose();
    }

    setStatus(CodeFormatStatusEnum.LOADING);
  };

  const handleClose = async () => {
    setFormattedCode("");
    setStatus(CodeFormatStatusEnum.LOADING);

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
          top: "50px",
          left: "50px",
          right: "50px",
          bottom: "50px",
          border: "1px solid black",
          padding: "16px",
        },
      }}
      ariaHideApp={false}
      onRequestClose={handleClose}
      closeTimeoutMS={200}
    >
      <div className={styles.modalContent}>
        <div className={styles.beforeAfter}>
          <Row className="g-0">
            <Col>
              <div className={clsx(styles.diffBoxHeader, styles.before)}>
                <Chip color="pink" small>
                  Original
                </Chip>
                <span className={styles.desc}>Before formatting</span>
              </div>
            </Col>
            <Col>
              <div className={clsx(styles.diffBoxHeader, styles.after)}>
                <Chip color="blue" small>
                  Modified
                </Chip>
                <span className={styles.desc}>After formatting</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.diffEditorWrapper}>
          {status === CodeFormatStatusEnum.SUCCESS && (
            <DiffEditor
              original={original}
              modified={formattedCode}
              height={"100%"}
              beforeMount={handleEditorWillMount}
              language={language}
              theme={isThemeLoaded ? "CustomTheme" : "light"}
              options={{
                folding: false,
                fontSize: 20,
                wordWrap: "on",
                minimap: {
                  enabled: false,
                },
                extraEditorClassName: styles.codeEditor,
                scrollBeyondLastLine: false,
              }}
            />
          )}

          {status === CodeFormatStatusEnum.LOADING && (
            <div className={styles.loadingBox}>
              <p>Formatting Code</p>
            </div>
          )}
        </div>
        <div className={styles.controls}>
          {status === CodeFormatStatusEnum.SUCCESS && (
            <button
              onClick={handleAccept}
              className={clsx(styles.acceptButton, styles.button)}
            >
              <BiShapeTriangle className={styles.reactIcon} />
              <span className={styles.label}>Apply Changes</span>
            </button>
          )}
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
