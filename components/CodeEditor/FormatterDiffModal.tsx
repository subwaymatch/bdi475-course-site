import { useEffect, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { sm, md } from "constants/media-query-strings";
import ReactModal from "react-modal";
import styles from "./editor.module.scss";
import customTheme from "./custom-theme.json";
import _ from "lodash";

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
  const [formattedCode, setFormattedCode] = useState(LOADING_MESSAGE);
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
    setFormattedCode(LOADING_MESSAGE);

    onClose();
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={handleClose}>
      <div
        style={{
          height: "100%",
        }}
      >
        <DiffEditor
          original={original}
          modified={formattedCode}
          height="80%"
          beforeMount={handleEditorWillMount}
          language={language}
          theme={isThemeLoaded ? "CustomTheme" : "light"}
          options={{
            folding: false,
            fontSize: isScreenSm ? 18 : isScreenMd ? 19 : 20,
            wordWrap: "on",
            minimap: {
              enabled: false,
            },
            extraEditorClassName: styles.codeEditor,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div>
        <button onClick={handleAccept}>Accept Changes</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </ReactModal>
  );
}
