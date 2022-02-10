import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "styles/hljs.custom.scss";
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";
import PythonRuntimeProvider from "lib/pyodide/PythonRuntimeProvider";
import { UserContextProvider } from "context/UserContext";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import sassVariables from "styles/colors.module.scss";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

const muiTheme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      contrastText: sassVariables.white,
      main: sassVariables.blue,
    },
    secondary: {
      contrastText: sassVariables.white,
      main: sassVariables.green,
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
        <ThemeProvider theme={muiTheme}>
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
        </ThemeProvider>
      </PythonRuntimeProvider>
    </UserContextProvider>
  );
}

export default App;
