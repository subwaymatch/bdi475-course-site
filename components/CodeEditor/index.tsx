import { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./editor.module.scss";
import customTheme from "./custom-theme.json";

type CodeEditorProps = {
  editorValue: string;
  onChange: (v: string) => void;
  language: string;
  height?: string | number;
};

export default function CodeEditor({
  editorValue,
  onChange,
  language,
  height,
}: CodeEditorProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("CustomTheme", customTheme);
    setIsThemeLoaded(true);
  }

  return (
    <div className={styles.codeEditorWrapper}>
      <Editor
        value={editorValue}
        height={height ? height : "100%"}
        beforeMount={handleEditorWillMount}
        onChange={(v) => {
          onChange(v as string);
        }}
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
    </div>
  );
}
