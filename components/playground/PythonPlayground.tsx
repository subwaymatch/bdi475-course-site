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
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";

import Box from "@mui/material/Box";
import { VscPackage } from "react-icons/vsc";
import { BsBox } from "react-icons/bs";
import {
  Backdrop,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";

export default function PythonPlayground() {
  const [topBarRef, { height: topBarHeight }] = useMeasure();
  const [bottomBarRef, { height: bottomBarHeight }] = useMeasure();
  const { height: windowHeight } = useWindowSize();
  const {
    status: pythonRuntimeStatus,
    findNewImports,
    runCode,
  } = usePythonRuntime();

  let playgroundBodyHeight = windowHeight - topBarHeight - bottomBarHeight;
  playgroundBodyHeight = Number.isFinite(playgroundBodyHeight)
    ? playgroundBodyHeight
    : 800;

  const [userCode, setUserCode] = useState(
    "# Python\nimport sys\nsys.version\n"
  );
  const [codeResult, setCodeResult] = useState<ICodeExecutionResult>(null);
  const [isPackageDrawerOpen, setIsPackageDrawerOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(true);

  const runUserCode = async () => {
    const imports = await findNewImports(userCode);

    console.log(`imports=${imports}`);

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
              onClick={() => setIsPackageDrawerOpen(true)}
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

      <PackagesDrawer
        isOpen={isPackageDrawerOpen}
        handleClose={() => setIsPackageDrawerOpen(false)}
      />

      <PackageInstallConfirmationDialog
        isOpen={isImportDialogOpen}
        handleClose={() => setIsImportDialogOpen(false)}
      />
    </div>
  );
}

function PackageInstallConfirmationDialog({ isOpen, handleClose }) {
  return (
    <Backdrop
      sx={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      open={isOpen}
      onClick={() => {}}
    >
      <Box>
        <Typography
          sx={{
            marginBottom: 3,
          }}
        >
          Python Package Manager
        </Typography>

        {["pandas", "numpy", "statsmodel"].map((packageName) => (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            key={packageName}
            spacing={2}
            sx={{
              color: "#888",
              paddingTop: 0.5,
              paddingBottom: 0.5,
            }}
          >
            <div style={{ color: "#69db58" }}>
              <VscPackage />
            </div>

            <Typography>{packageName}</Typography>
          </Stack>
        ))}

        <LinearProgress sx={{ marginTop: 3 }} />

        <Typography sx={{ marginTop: 2 }}>Installing pandas...</Typography>
      </Box>
    </Backdrop>
  );
}

function PackagesDrawer({ isOpen, handleClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Available" />
          <Tab label="Installed" />
        </Tabs>
      </Box>
      Test
    </Drawer>
  );
}
