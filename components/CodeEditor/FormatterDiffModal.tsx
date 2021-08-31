import { useEffect, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { sm, md } from "constants/media-query-strings";
import ReactModal from "react-modal";
import styles from "./FormatterDiffModal.module.scss";
import customTheme from "./custom-theme.json";
import _ from "lodash";
import clsx from "clsx";
import { Row, Col } from "react-bootstrap";
import { BiShapeTriangle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

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
  height?: string | number;
}

export default function FormatterDiffModal({
  isOpen,
  onAccept,
  onClose,
  original,
  language,
  height,
}: IFormatterDiffModal) {
  const LOADING_MESSAGE = "Loading";
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // loading, success, error
  const [status, setStatus] = useState(CodeFormatStatusEnum.LOADING);
  const [formattedCode, setFormattedCode] = useState("");
  const isScreenSm = useMediaQuery(sm);
  const isScreenMd = useMediaQuery(md);

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

    console.log(`formatResult`);
    console.log(formatResult);
  };

  useEffect(() => {
    if (isOpen) {
      formatCode();
    }
  }, [isOpen]);

  const handleAccept = async () => {
    await onAccept(_.cloneDeep(formattedCode));
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
          border: "1px solid #ccc",
          padding: "16px",
        },
      }}
      ariaHideApp={false}
      onRequestClose={handleClose}
    >
      <div className={styles.modalContent}>
        {status === CodeFormatStatusEnum.SUCCESS && (
          <>
            <div className={styles.beforeAfter}>
              <Row className="g-0">
                <Col>
                  <div className={clsx(styles.diffBoxHeader, styles.before)}>
                    <span className="label pink">Original</span>
                    <span className={styles.desc}>Before formatting</span>
                  </div>
                </Col>
                <Col>
                  <div className={clsx(styles.diffBoxHeader, styles.after)}>
                    <span className="label green">Modified</span>
                    <span className={styles.desc}>After formatting</span>
                  </div>
                </Col>
              </Row>
            </div>
            <DiffEditor
              original={original}
              modified={formattedCode}
              height="60vh"
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
          </>
        )}

        <div className={styles.controls}>
          <button
            onClick={handleAccept}
            className={clsx(styles.acceptButton, styles.button)}
          >
            <BiShapeTriangle className={styles.reactIcon} />
            <span className={styles.label}>Apply Changes</span>
          </button>
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
