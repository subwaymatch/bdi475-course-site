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

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider supabaseClient={supabaseClient}>
      <PythonRuntimeProvider>
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
      </PythonRuntimeProvider>
    </UserContextProvider>
  );
}

export default App;
