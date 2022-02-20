import sassVariables from "styles/colors.module.scss";
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 16,
    button: {
      textTransform: "none",
      letterSpacing: "-0.01rem",
    },
    body1: {
      fontSize: "1.2rem",
      letterSpacing: "-0.015rem",
    },
    body2: {
      fontSize: "1.1rem",
      letterSpacing: "-0.015rem",
    },
  },
  palette: {
    primary: {
      contrastText: sassVariables.white,
      main: "#575757",
    },
    secondary: {
      contrastText: sassVariables.white,
      main: sassVariables.purple,
    },
    error: {
      contrastText: sassVariables.white,
      main: sassVariables.red,
    },
    warning: {
      contrastText: sassVariables.white,
      main: sassVariables.orange,
    },
    info: {
      contrastText: sassVariables.white,
      main: sassVariables.blue,
    },
    success: {
      contrastText: sassVariables.white,
      main: sassVariables.green,
    },
  },
});

export default muiTheme;
