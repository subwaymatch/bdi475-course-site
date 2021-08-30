import { useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { sm, md } from "constants/media-query-strings";
import styles from "./editor.module.scss";
import customTheme from "./custom-theme.json";

interface IDiffViewerProps {
  original: string;
  modified: string;
  language: string;
  height?: string | number;
}

export default function DiffViewer({
  original,
  modified,
  language,
  height,
}: IDiffViewerProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const isScreenSm = useMediaQuery(sm);
  const isScreenMd = useMediaQuery(md);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("CustomTheme", customTheme);
    setIsThemeLoaded(true);
  }

  return (
    <div className={styles.codeEditorWrapper}>
      <DiffEditor
        original={original}
        modified={modified}
        height={height ? height : "100%"}
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
  );
}
