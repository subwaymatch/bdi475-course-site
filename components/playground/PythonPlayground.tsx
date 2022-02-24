import { useMeasure, useWindowSize } from "react-use";
import CodeEditor from "components/CodeEditor";
import styles from "./PythonPlayground.module.scss";
import clsx from "clsx";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Fab from "@mui/material/Fab";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import {
  ICodeExecutionResult,
  PyodideResultDisplayType,
  PythonRuntimeStatus,
} from "types/pyodide";
import usePythonRuntime from "hooks/usePythonRuntime";
import PackagesDrawer from "components/python-runtime/PackagesDrawer";
import PackageLoadingOverlay from "components/python-runtime/PackageLoadingOverlay";
import Split from "react-split";
import { BiPyramid } from "react-icons/bi";

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const {
    status: pythonRuntimeStatus,
    loadedPackages,
    loadPackages,
    findNewImports,
    runCode,
  } = usePythonRuntime();

  let playgroundBodyHeight = useMemo(
    () => windowHeight - topBarHeight - bottomBarHeight,
    [windowHeight, topBarHeight, bottomBarHeight]
  );
  playgroundBodyHeight = Number.isFinite(playgroundBodyHeight)
    ? playgroundBodyHeight
    : 800;

  const [userCode, setUserCode] = useState(
    "import pandas as pd\n\npd.DataFrame({\n  'a': [1, 2, 3],\n  'b': [True, False, False]\n})\n"
  );
  const [codeResult, setCodeResult] = useState<ICodeExecutionResult>(null);
  const [isPackageDrawerOpen, setIsPackageDrawerOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const runUserCode = async () => {
    const newImports = await findNewImports(userCode);

    console.log(`new imports=${newImports}`);

    if (newImports) {
      await loadPackages(newImports);
    }

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

      <Split
        className={clsx(styles.playgroundBody, styles.horizontalSplit)}
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

        <Split
          direction="vertical"
          className={clsx(styles.resultWrapper, styles.verticalSplit)}
        >
          <div className={clsx(styles.standardOutputWrapper, styles.outputBox)}>
            <div className={styles.boxHeader}>
              <h3>
                <span className={styles.text}>Standard Output</span>

                {codeResult?.hasError && (
                  <span className={clsx(styles.status, styles.hasError)}>
                    Error
                  </span>
                )}
              </h3>

              <span className="accent green" />
            </div>

            <div className={styles.boxContent}>
              {codeResult?.stdout || codeResult?.hasError ? (
                <>
                  {codeResult?.stdout && (
                    <pre className={styles.stdout}>{codeResult?.stdout}</pre>
                  )}

                  {codeResult?.hasError && codeResult?.errorMessage && (
                    <pre
                      className={clsx(styles.errorMessage, {
                        [styles.noOutput]: !codeResult?.stdout,
                      })}
                    >
                      {codeResult?.errorMessage}
                    </pre>
                  )}
                </>
              ) : (
                <div className={styles.emptyBox}>
                  <BiPyramid className={styles.reactIcon} />
                  <span className={styles.message}>No Output</span>
                </div>
              )}
            </div>
          </div>

          <div
            className={clsx(styles.evaluatedOutputWrapper, styles.outputBox)}
          >
            <div className={styles.boxHeader}>
              <h3>Evaluated Result</h3>
              <span className="accent blue" />
            </div>

            <div className={styles.boxContent}>
              {codeResult?.lastEvaluatedResult ? (
                codeResult?.evaluatedResultDisplayType ===
                PyodideResultDisplayType.HTML ? (
                  <div
                    className={styles.renderedHtml}
                    dangerouslySetInnerHTML={{
                      __html: codeResult.lastEvaluatedResult,
                    }}
                  />
                ) : (
                  <pre className={styles.lastEvaluatedResult}>
                    {codeResult.lastEvaluatedResult}
                  </pre>
                )
              ) : (
                <div className={styles.emptyBox}>
                  <BiPyramid className={styles.reactIcon} />
                  <span className={styles.message}>No Output</span>
                </div>
              )}
            </div>
          </div>
        </Split>
      </Split>

      <div className={styles.bottomBar} ref={bottomBarRef}>
        <div className={styles.controlsWrapper}>
          <div
            className={clsx(styles.button, styles.settings)}
            onClick={() => {}}
          >
            <span className={styles.label}>Settings ↑</span>
          </div>

          <div
            className={clsx(styles.button, styles.settings)}
            onClick={() => setIsPackageDrawerOpen(true)}
          >
            <span className={styles.label}>Packages →</span>
          </div>
        </div>
        <div className={styles.logoWrapper} style={{}}>
          <Link href="/">
            <a className={clsx(styles.logoLink)}>
              {/* <Image src={logoImage} alt="BDI 475" width={72} height={19} /> */}
              dataslope
            </a>
          </Link>
        </div>
      </div>

      <PackagesDrawer
        isOpen={isPackageDrawerOpen}
        handleClose={() => setIsPackageDrawerOpen(false)}
      />

      <PackageLoadingOverlay
        isOpen={pythonRuntimeStatus === PythonRuntimeStatus.LOADING_PACKAGES}
        // isOpen={true}
        handleClose={() => setIsImportDialogOpen(false)}
      />
    </div>
  );
}
