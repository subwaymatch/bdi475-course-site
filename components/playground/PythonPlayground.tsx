import { useMeasure, useWindowSize } from "react-use";
import CodeEditor from "components/CodeEditor";
import styles from "./PythonPlayground.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import logoImage from "public/images/logo_bdi475.png";
import Stack from "@mui/material/Stack";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Fab from "@mui/material/Fab";
import { toast } from "react-toastify";
import { useState } from "react";
import { ICodeExecutionResult, PythonRuntimeStatus } from "types/pyodide";
import usePythonRuntime from "hooks/usePythonRuntime";

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const { status: pythonRuntimeStatus, runCode } = usePythonRuntime();

  let playgroundBodyHeight = windowHeight - topBarHeight - bottomBarHeight;
  playgroundBodyHeight = Number.isFinite(playgroundBodyHeight)
    ? playgroundBodyHeight
    : 800;

  console.log(
    `windowHeight=${windowHeight}, topBarHeight=${topBarHeight}, bottomBarHeight=${bottomBarHeight}`
  );

  const [userCode, setUserCode] = useState("# Python");
  const [codeResult, setCodeResult] = useState<ICodeExecutionResult>(null);

  const runUserCode = async () => {
    const result = await runCode(userCode);
    setCodeResult(result);

    if (result.hasError) {
      toast.error("See the error message below.");
    } else {
      toast("Run complete");
    }
  };

  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.topBar} ref={topBarRef}>
        Top Bar
      </div>

      <div
        className={styles.playgroundBody}
        style={{
          height: `${playgroundBodyHeight}px`,
        }}
      >
        <div className={styles.codeEditorWrapper}>
          <CodeEditor
            editorValue={userCode}
            onChange={setUserCode}
            onRun={null}
            onCheck={null}
            language="python"
            height="100%"
          />

          <div className={styles.floatingButtonWrapper}>
            <Fab
              color="primary"
              size="large"
              aria-label="add"
              sx={{
                boxShadow: "none",
              }}
              disabled={pythonRuntimeStatus !== PythonRuntimeStatus.READY}
              onClick={runUserCode}
            >
              <PlayArrowIcon />
            </Fab>
          </div>
        </div>

        <div className={styles.resultWrapper}>
          <div className={clsx(styles.standardOutputWrapper, styles.outputBox)}>
            <div className={styles.boxHeader}>
              <h3>Standard Output</h3>
            </div>

            <div className={styles.boxContent}>
              <pre>
                {codeResult?.stdout}
                {codeResult?.errorMessage}
              </pre>
            </div>
          </div>

          <div
            className={clsx(styles.evaluatedOutputWrapper, styles.outputBox)}
          >
            <div className={styles.boxHeader}>
              <h3>Evaluated Result</h3>
            </div>

            <div className={styles.boxContent}>
              <pre>{codeResult?.lastEvaluatedResult}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar} ref={bottomBarRef}>
        <div className={styles.controlsWrapper}>
          <Stack direction="row" spacing={1}>
            <div
              className={clsx(styles.button, styles.settings)}
              onClick={() => {}}
            >
              <IoSettingsOutline className={styles.reactIcon} />
              <span className={styles.label}>Settings</span>
            </div>

            <div
              className={clsx(styles.button, styles.settings)}
              onClick={() => {}}
            >
              <FiPackage className={styles.reactIcon} />
              <span className={styles.label}>Packages</span>
            </div>
          </Stack>
        </div>
        <div
          className={styles.logoWrapper}
          style={{
            height: 25,
          }}
        >
          <Link href="/">
            <a className={clsx(styles.logoLink)}>
              <Image src={logoImage} alt="BDI 475" width={72} height={19} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
