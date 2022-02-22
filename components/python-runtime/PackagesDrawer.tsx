import { Drawer, Tabs, Tab, Box, IconButton, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import availablePyodidePackages from "data/available-pyodide-packages.json";
import { IPyodidePackageNameAndVersion } from "types/pyodide";
import styles from "./PackagesDrawer.module.scss";
import clsx from "clsx";
import usePythonRuntime from "hooks/usePythonRuntime";
import { VscInbox } from "react-icons/vsc";

export default function PackagesDrawer({ isOpen, handleClose }) {
  const [tabIndex, setTabIndex] = useState(0);
  const isInstalledTabSelected = useMemo(() => tabIndex === 1, [tabIndex]);
  const { loadedPackages } = usePythonRuntime();
  const [filterString, setFilterString] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  let packages: IPyodidePackageNameAndVersion[] = isInstalledTabSelected
    ? availablePyodidePackages.filter((o) => loadedPackages?.includes(o.name))
    : availablePyodidePackages;

  if (filterString.trim() !== "") {
    packages = packages.filter((o) => o.name.includes(filterString.trim()));
  }

  console.log(`new tab value=${tabIndex}`);

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: 300 }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Available" />
          <Tab label="Installed" />
        </Tabs>
      </Box>

      <div className={styles.controlsWrapper}>
        <TextField
          id="standard-basic"
          label="Filter by Search"
          type="search"
          variant="filled"
          value={filterString}
          onChange={(e) => setFilterString(e.target.value)}
        />
      </div>

      <div className={styles.packageListWrapper}>
        {packages.map((o, i) => {
          // const installed = loadedPackages.includes(o.name);
          const installed = i % 2 === 0;
          const notInstalled = !installed;

          return (
            <div
              className={clsx(styles.packageItem, {
                [styles.installed]: installed,
                [styles.notInstalled]: notInstalled,
              })}
              key={o.name}
            >
              <div className={styles.name}>{o.name}</div>
              {installed ? (
                <div className={styles.installStatus}>Installed</div>
              ) : (
                <div className={styles.installStatus}>Install →</div>
              )}
              <div className={styles.version}>{o.version}</div>
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
