import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "styles/hljs.custom.scss";
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";
import { UserContextProvider } from "context/UserContext";
import { supabaseClient } from "lib/supabase/supabaseClient";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import sassVariables from "styles/colors.module.scss";
import PythonRuntimeProvider from "lib/pyodide/PythonRuntimeProvider";

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

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider supabaseClient={supabaseClient}>
      <PythonRuntimeProvider>
        <MuiThemeProvider theme={muiTheme}>
          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </PythonRuntimeProvider>
    </UserContextProvider>
  );
}

export default App;
