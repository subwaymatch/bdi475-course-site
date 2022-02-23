import {
  Drawer,
  Tabs,
  Tab,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from "react";
import availablePyodidePackages from "data/available-pyodide-packages.json";
import {
  IPyodidePackageNameAndVersion,
  PythonRuntimeStatus,
} from "types/pyodide";
import styles from "./PackagesDrawer.module.scss";
import clsx from "clsx";
import usePythonRuntime from "hooks/usePythonRuntime";
import { VscInbox } from "react-icons/vsc";
import { RiDownloadLine } from "react-icons/ri";
import { useMeasure } from "react-use";
import { motion } from "framer-motion";
import { MdArrowDownward } from "react-icons/md";
import produce from "immer";

export default function PackagesDrawer({ isOpen, handleClose }) {
  const [tabIndex, setTabIndex] = useState(0);
  const isInstalledTabSelected = useMemo(() => tabIndex === 1, [tabIndex]);
  const {
    status: pythonRuntimeStatus,
    loadedPackages,
    loadPackages,
  } = usePythonRuntime();
  const [filterString, setFilterString] = useState("");
  const [packagesToInstall, setPackagesToInstall] = useState([]);
  const [drawerStickyRef, { height: drawerStickyHeight }] = useMeasure();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  let packages: IPyodidePackageNameAndVersion[] = isInstalledTabSelected
    ? availablePyodidePackages.filter((o) => loadedPackages?.includes(o.name))
    : availablePyodidePackages;

  if (filterString.trim() !== "") {
    packages = packages.filter((o) => o.name.includes(filterString.trim()));
  }

  useEffect(() => {
    const updatedList = produce(packagesToInstall, (draft) => {
      return draft.filter(
        (packageName) => !loadedPackages.includes(packageName)
      );
    });

    setPackagesToInstall(updatedList);
  }, [loadedPackages]);

  const cleanUpAndClose = () => {
    setTabIndex(0);
    setFilterString("");
    setPackagesToInstall([]);
    handleClose();
  };

  const handlePackageClick = (packageName: string) => {
    if (loadedPackages.includes(packageName)) {
      return;
    }

    if (!packagesToInstall.includes(packageName)) {
      setPackagesToInstall((previousList) => [...previousList, packageName]);
    } else {
      setPackagesToInstall((previousList) =>
        previousList.filter((v) => v !== packageName)
      );
    }
  };

  const handleInstallButtonClick = async () => {
    if (
      packagesToInstall.length === 0 ||
      pythonRuntimeStatus === PythonRuntimeStatus.LOADING_PACKAGES
    ) {
      return;
    }

    cleanUpAndClose();

    await loadPackages(packagesToInstall);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={cleanUpAndClose}>
      <div className={styles.stickyWrapper} ref={drawerStickyRef}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
            <Tab sx={{ fontWeight: 600 }} label="Available" />
            <Tab sx={{ fontWeight: 600 }} label="Installed" />
          </Tabs>
        </Box>

        <div className={styles.controlsWrapper}>
          <TextField
            id="standard-basic"
            label="Filter by Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              className: styles.searchInput,
              autoComplete: "off",
            }}
            type="search"
            variant="filled"
            value={filterString}
            fullWidth
            onChange={(e) => setFilterString(e.target.value)}
          />

          <div
            className={clsx(styles.installButton, {
              [styles.enabled]: packagesToInstall.length > 0,
              [styles.disabled]:
                packagesToInstall.length === 0 ||
                pythonRuntimeStatus === PythonRuntimeStatus.LOADING_PACKAGES,
            })}
            onClick={handleInstallButtonClick}
          >
            <div className={styles.label}>
              <span>
                {packagesToInstall.length > 0 ? (
                  pythonRuntimeStatus !==
                  PythonRuntimeStatus.LOADING_PACKAGES ? (
                    <>
                      Click to Install {packagesToInstall.length} package
                      {packagesToInstall.length > 1 ? "s" : null}
                    </>
                  ) : (
                    <>
                      {packagesToInstall.length} package
                      {packagesToInstall.length > 1 ? "s" : null} remaining
                    </>
                  )
                ) : (
                  <>Select package(s) to install</>
                )}
              </span>
              {packagesToInstall.length > 0 && (
                <span className="accent purple" />
              )}
            </div>

            <motion.div
              animate={{ y: [-1, 1, -1] }}
              transition={{ ease: "linear", duration: 0.5, repeat: Infinity }}
              className={styles.iconWrapper}
            >
              {packagesToInstall.length > 0 ? (
                <RiDownloadLine className={styles.reactIcon} />
              ) : (
                <MdArrowDownward className={styles.reactIcon} />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className={styles.packageListWrapper}
        style={{
          paddingTop: drawerStickyHeight,
        }}
      >
        {packages.map((o) => {
          const installed = loadedPackages.includes(o.name);
          const notInstalled = !installed;
          const toInstall = packagesToInstall.includes(o.name);

          return (
            <div
              className={clsx(styles.packageItem, {
                [styles.installed]: installed,
                [styles.notInstalled]: notInstalled,
                [styles.toInstall]: toInstall,
              })}
              onClick={() => handlePackageClick(o.name)}
              key={o.name}
            >
              <div className={styles.name}>{o.name}</div>

              <div className={styles.version}>{o.version}</div>

              <div className={styles.installStatus}>
                {installed && "Installed"}
                {notInstalled && !toInstall && "Select"}
                {notInstalled && toInstall && "Selected for Install"}
              </div>
            </div>
          );
        })}

        {(!packages || packages.length === 0) && (
          <div className={styles.emptyBox}>
            <VscInbox className={styles.reactIcon} />
            <span className={styles.message}>
              {isInstalledTabSelected ? "No Installed Package" : "Unavailable"}
            </span>
          </div>
        )}
      </div>
    </Drawer>
  );
}
