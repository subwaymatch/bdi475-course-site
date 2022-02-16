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
import { useState } from "react";
import usePythonRuntime from "hooks/usePythonRuntime";
import * as Comlink from "comlink";
import { toast } from "react-toastify";

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [playgroundBodyRef] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const { isRuntimeReady, runCode } = usePythonRuntime();
  const [userCode, setUserCode] = useState("# Python");
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const runUserCode = async () => {
    const result = await runCode(userCode);

    console.log(result);

    setOutput(result.stdout);
    setHasError(result.hasError);
    setErrorMessage(result.errorMessage);

    if (result.hasError) {
      toast.error("See the error message below.");
    } else {
      let message = "Run complete";

      if (!result.stdout) {
        message += " - your code did not print anything.";
      }

      toast(message);
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
          height: `${windowHeight - topBarHeight - bottomBarHeight}px`,
        }}
        ref={playgroundBodyRef}
      >
        <div className={styles.codeEditorWrapper}>
          <CodeEditor
            editorValue={userCode}
            onChange={setUserCode}
            onRun={() => {
              if (!isRuntimeReady) {
                return;
              }

              runCode(userCode);
            }}
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
                {output}
                {errorMessage}
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
              <pre>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse vel elit neque. Quisque tempor pretium lorem sed
                gravida. Proin eget lorem viverra, interdum orci in, euismod
                elit. Fusce placerat lorem nulla. In id sem mattis, imperdiet
                urna et, fermentum nunc. Fusce posuere justo eu rhoncus semper.
              </pre>
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
