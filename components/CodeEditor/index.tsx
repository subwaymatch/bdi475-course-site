import { useState } from "react";
import Editor from "@monaco-editor/react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { sm, md } from "constants/media-query-strings";
import styles from "./editor.module.scss";
import customTheme from "./custom-theme.json";

type CodeEditorProps = {
  editorValue: string;
  onChange: (v: string) => void;
  onRun?: () => void;
  language: string;
  height?: string | number;
};

export default function CodeEditor({
  editorValue,
  onChange,
  onRun,
  language,
  height,
}: CodeEditorProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const isScreenSm = useMediaQuery(sm);
  const isScreenMd = useMediaQuery(md);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("CustomTheme", customTheme);
    setIsThemeLoaded(true);
  }

  function handleEditorOnMount(editor, monaco) {
    if (onRun) {
      // Keyboard shortcut to run code editor
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, onRun);
    }
  }

  return (
    <div className={styles.codeEditorWrapper}>
      <Editor
        value={editorValue}
        height={height ? height : "100%"}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorOnMount}
        onChange={(v) => {
          onChange(v as string);
        }}
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
