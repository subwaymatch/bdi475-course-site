import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "styles/hljs.custom.scss";
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";

import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";
import FirebaseAuthProvider from "firebase/FirebaseAuthProvider";
import PythonRuntimeProvider from "lib/pyodide/PythonRuntimeProvider";
import { firebaseConfig } from "firebase/firebaseClient";

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <PythonRuntimeProvider>
          <ToastContainer
            position="top-center"
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
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;
