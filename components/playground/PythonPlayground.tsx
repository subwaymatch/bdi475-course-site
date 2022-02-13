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

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [playgroundBodyRef, { height: playgroundBodyHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();

  console.log(
    `top=${topBarHeight}, body=${playgroundBodyHeight}, bottom=${bottomBarHeight}`
  );

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
            editorValue={"# test code"}
            onChange={() => {}}
            onRun={() => {}}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse vel elit neque. Quisque tempor pretium lorem sed
                gravida. Proin eget lorem viverra, interdum orci in, euismod
                elit. Fusce placerat lorem nulla. In id sem mattis, imperdiet
                urna et, fermentum nunc. Fusce posuere justo eu rhoncus semper.
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
