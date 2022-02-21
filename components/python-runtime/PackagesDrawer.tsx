import { Drawer, Tabs, Tab, Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import availablePyodidePackages from "data/available-pyodide-packages.json";
import { IPyodidePackageNameAndVersion } from "types/pyodide";
import styles from "./PackagesDrawer.module.scss";
import clsx from "clsx";

export default function PackagesDrawer({ isOpen, handleClose }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let availablePackages: IPyodidePackageNameAndVersion[] =
    availablePyodidePackages;

  console.log(`new tab value=${value}`);

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClose}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: 300 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            sx={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#4a4a4a",
            }}
            label="Available"
          />
          <Tab label="Installed" />
        </Tabs>
      </Box>

      <div className={styles.controlsWrapper}>
        <input type="text" placeholder="Search" />
      </div>

      <div className={styles.packageListWrapper}>
        {availablePackages.map((o, i) => (
          <div
            className={clsx(styles.packageItem, {
              [styles.installed]: i % 2 === 0,
            })}
            key={o.name}
          >
            <div className={styles.name}>{o.name}</div>
            {i % 2 === 0 && (
              <div className={styles.installStatus}>Installed</div>
            )}
            <div className={styles.version}>{o.version}</div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
