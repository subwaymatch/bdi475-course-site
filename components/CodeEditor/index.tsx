import { useState } from "react";
import Editor from "@monaco-editor/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { largeDesktop } from "constants/media-query-strings";
import styles from "./CodeEditor.module.scss";
import customLightTheme from "./custom-light-theme.json";

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
  const isLargeDesktop = useMediaQuery(largeDesktop);

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("CustomTheme", customLightTheme);
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
          fontSize: isLargeDesktop ? 18 : 17,
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
