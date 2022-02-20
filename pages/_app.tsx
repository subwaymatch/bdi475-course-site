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
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import muiTheme from "lib/mui/muiTheme";
import PythonRuntimeProvider from "lib/pyodide/PythonRuntimeProvider";

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
