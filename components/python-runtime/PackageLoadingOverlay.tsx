import Box from "@mui/material/Box";
import { VscPackage } from "react-icons/vsc";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import usePythonRuntime from "hooks/usePythonRuntime";
import styles from "./PackageLoadingOverlay.module.scss";
import clsx from "clsx";
import { PackageLoadingStatus } from "types/pyodide";
import { BiCheckCircle } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { CircularProgress } from "@mui/material";

export default function PackageLoadingOverlay({ isOpen, handleClose }) {
  const { packagesLoadingStatus } = usePythonRuntime();

  return (
    <Backdrop
      sx={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      open={isOpen}
      onClick={handleClose}
    >
      <Box className={styles.installer}>
        {packagesLoadingStatus.map((o) => (
          <div
            key={o.name}
            className={clsx(styles.packageItem, {
              [styles.waiting]: o.status === PackageLoadingStatus.WAITING,
              [styles.inProgress]:
                o.status === PackageLoadingStatus.IN_PROGRESS,
              [styles.completed]: o.status === PackageLoadingStatus.COMPLETED,
            })}
          >
            <div className={styles.left}>
              <VscPackage className={styles.reactIcon} />

              <div className={styles.label}>{o.name}</div>
            </div>

            <div className={styles.right}>
              {o.status === PackageLoadingStatus.WAITING && (
                <BsThreeDots className={styles.reactIcon} />
              )}
              {o.status === PackageLoadingStatus.IN_PROGRESS && (
                <CircularProgress size={15} color="inherit" />
              )}
              {o.status === PackageLoadingStatus.COMPLETED && (
                <BiCheckCircle className={styles.reactIcon} />
              )}
            </div>
          </div>
        ))}

        <LinearProgress sx={{ marginTop: 4 }} />
      </Box>
    </Backdrop>
  );
}
