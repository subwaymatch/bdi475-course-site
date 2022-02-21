import Box from "@mui/material/Box";
import { VscPackage } from "react-icons/vsc";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function PackageInstallConfirmationDialog({
  isOpen,
  handleClose,
}) {
  return (
    <Backdrop
      sx={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      open={isOpen}
      onClick={handleClose}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 3,
            fontWeight: 600,
            letterSpacing: 0,
          }}
        >
          Python Package Installer
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

            <Typography variant="body2">{packageName}</Typography>
          </Stack>
        ))}

        <LinearProgress sx={{ marginTop: 4 }} />

        <Typography variant="body2" sx={{ marginTop: 1.5 }}>
          Downloading pandas...
        </Typography>
      </Box>
    </Backdrop>
  );
}
