import { useState } from "react";
import Editor from "@monaco-editor/react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { sm, lg } from "constants/media-query-strings";
import styles from "./CodeEditor.module.scss";
import customTheme from "./custom-theme.json";

interface ICodeEditorProps {
  editorValue: string;
  onChange: (v: string) => void;
  onRun?: () => void;
  onCheck?: () => void;
  language: string;
  height?: string | number;
}

export default function CodeEditor({
  editorValue,
  onChange,
  onRun,
  onCheck,
  language,
  height,
}: ICodeEditorProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const isScreenSm = useMediaQuery(sm);
  const isScreenLg = useMediaQuery(lg);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("CustomTheme", customTheme);
    setIsThemeLoaded(true);
  }

  function handleEditorOnMount(editor, monaco) {
    // Disable shortcuts for now
    // if (onRun) {
    //   // Keyboard shortcut to run code editor
    //   editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, onRun);
    // }
    // if (onCheck) {
    //   // Keyboard shortcut to check code with test cases
    //   editor.addCommand(
    //     monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    //     onCheck
    //   );
    // }
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
          fontSize: isScreenSm ? 17 : isScreenLg ? 18 : 19,
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
