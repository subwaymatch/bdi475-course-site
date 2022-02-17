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
import * as Comlink from "comlink";
import { toast } from "react-toastify";
import type {
  PyodideRuntime,
  TPyodideRuntime,
} from "lib/pyodide-comlink/worker";
import { useState, useEffect, useRef } from "react";
import { ICodeExecutionResult } from "types/pyodide";

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();

  let playgroundBodyHeight = windowHeight - topBarHeight - bottomBarHeight;
  playgroundBodyHeight = Number.isFinite(playgroundBodyHeight)
    ? playgroundBodyHeight
    : 800;

  console.log(
    `windowHeight=${windowHeight}, topBarHeight=${topBarHeight}, bottomBarHeight=${bottomBarHeight}`
  );

  const [userCode, setUserCode] = useState("# Python");
  const [codeResult, setCodeResult] = useState<ICodeExecutionResult>(null);

  const classRef = useRef<Comlink.Remote<PyodideRuntime>>();

  const init = async (o: Comlink.Remote<TPyodideRuntime>) => {
    const instance = await new o();
    await instance.initialize();

    classRef.current = instance;
  };

  useEffect(() => {
    const PyodideRuntimeClass = Comlink.wrap<TPyodideRuntime>(
      new Worker(new URL("lib/pyodide-comlink/worker.ts", import.meta.url))
    );

    init(PyodideRuntimeClass);
  }, []);

  const runUserCode = async () => {
    console.log(1);

    console.log(2);

    const instance = classRef.current;

    await instance.initialize();
    console.log(3);

    const result = await instance.runCode(userCode);

    console.log(4);

    console.log(result);

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
