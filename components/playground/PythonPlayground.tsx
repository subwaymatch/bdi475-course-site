import { useMeasure, useWindowSize } from "react-use";
import CodeEditor from "components/CodeEditor";
import styles from "./PythonPlayground.module.scss";
import clsx from "clsx";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Fab from "@mui/material/Fab";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { PyodideResultDisplayType, PythonRuntimeStatus } from "types/pyodide";
import usePythonRuntime from "hooks/usePythonRuntime";
import PackagesDrawer from "components/python-runtime/PackagesDrawer";
import PackageLoadingOverlay from "components/python-runtime/PackageLoadingOverlay";
import Split from "react-split";
import { BiPyramid } from "react-icons/bi";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import pythonPlaygroundState from "components/playground/pythonPlaygroundState";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { BsQuestion } from "react-icons/bs";
import PlaygroundTopBar from "./PlaygroundTopBar";
import { useSnapshot } from "valtio";

export default function PythonPlayground() {
  const router = useRouter();
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const {
    status: pythonRuntimeStatus,
    loadPackages,
    findNewImports,
    runCode,
  } = usePythonRuntime();

  const { userCode, codeResult } = useSnapshot(pythonPlaygroundState);

  let playgroundBodyHeight = useMemo(() => {
    const newHeight = windowHeight - topBarHeight - bottomBarHeight;
    return Number.isFinite(newHeight) ? newHeight : 800;
  }, [windowHeight, topBarHeight, bottomBarHeight]);

  const [isPackageDrawerOpen, setIsPackageDrawerOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const stdoutBoxPopupState = usePopupState({
    variant: "popover",
    popupId: "stdoutBoxPopover",
  });

  const evalResultBoxPopupState = usePopupState({
    variant: "popover",
    popupId: "evalResultBoxPopover",
  });

  const runUserCode = async () => {
    const newImports = await findNewImports(userCode);

    if (newImports) {
      await loadPackages(newImports);
    }

    const result = await runCode(userCode);
    pythonPlaygroundState.codeResult = result;

    if (result.hasError) {
      toast.error("See the error message below.");
    } else {
      toast("Run complete");
    }
  };

  useEffect(() => {}, [router.isReady]);

  return (
    <div className={styles.playgroundWrapper}>
      <PlaygroundTopBar
        topBarRef={topBarRef}
        handleDelete={() => {}}
        clone={() => {}}
        save={() => {}}
      />

      <Split
        className={clsx(styles.playgroundBody, styles.horizontalSplit)}
        style={{
          height: `${playgroundBodyHeight}px`,
        }}
      >
        <div className={styles.codeEditorWrapper}>
          <CodeEditor
            editorValue={userCode}
            onChange={(val) => {
              pythonPlaygroundState.userCode = val;
            }}
            onRun={null}
            onCheck={null}
            language="python"
            height="100%"
          />

          <div className={styles.floatingButtonWrapper}>
            <Fab
              aria-label="run"
              color="primary"
              sx={{
                boxShadow: "none",
              }}
              disabled={pythonRuntimeStatus !== PythonRuntimeStatus.READY}
              onClick={runUserCode}
            >
              {pythonRuntimeStatus === PythonRuntimeStatus.READY ? (
                <PlayArrowIcon />
              ) : (
                <UseAnimations
                  animation={activity}
                  fillColor="#777777"
                  size={24}
                  style={{ padding: 100 }}
                />
              )}
            </Fab>
          </div>
        </div>

        <div className={clsx(styles.resultWrapper)}>
          <div className={clsx(styles.outputBox)}>
            <div className={styles.boxHeader}>
              <h3>
                <span className={styles.text}>Output</span>

                {!codeResult?.hasError && (
                  <span
                    className={clsx("accent", {
                      gray: !(
                        codeResult?.stdout || codeResult?.lastEvaluatedResult
                      ),
                      green:
                        codeResult?.stdout || codeResult?.lastEvaluatedResult,
                    })}
                  />
                )}

                {codeResult?.hasError && (
                  <span className={clsx(styles.status, styles.hasError)}>
                    Error
                  </span>
                )}
              </h3>

              <BsQuestion
                className={styles.reactIcon}
                {...bindHover(stdoutBoxPopupState)}
              />

              <HoverPopover
                {...bindPopover(stdoutBoxPopupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                elevation={0}
              >
                <div className={styles.popoverContent}>
                  This area displays the standard output of your Python kernel.
                </div>
              </HoverPopover>
            </div>

            <div className={styles.boxContent}>
              {codeResult?.stdout && (
                <h4 className={styles.stdoutTitle}>
                  <span>Standard Output</span>
                </h4>
              )}

              {(codeResult?.stdout || codeResult?.hasError) && (
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
              )}

              {codeResult?.lastEvaluatedResult && (
                <h4 className={styles.evaluatedResultTitle}>
                  <span>Last Evaluated Result</span>
                </h4>
              )}

              {codeResult?.lastEvaluatedResult &&
                (codeResult?.evaluatedResultDisplayType ===
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
                ))}

              {!codeResult?.stdout &&
                !codeResult?.hasError &&
                !codeResult?.lastEvaluatedResult && (
                  <div className={styles.emptyBox}>
                    <BiPyramid className={styles.reactIcon} />

                    <span className={styles.message}>No Output</span>
                  </div>
                )}
            </div>
          </div>
        </div>
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
            <a className={clsx(styles.logoLink)}>python playground</a>
          </Link>
        </div>
      </div>

      <PackagesDrawer
        isOpen={isPackageDrawerOpen}
        handleClose={() => setIsPackageDrawerOpen(false)}
      />

      <PackageLoadingOverlay
        isOpen={pythonRuntimeStatus === PythonRuntimeStatus.LOADING_PACKAGES}
        handleClose={() => setIsImportDialogOpen(false)}
      />
    </div>
  );
}
