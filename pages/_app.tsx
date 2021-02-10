import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";

import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";
import FirebaseAuthProvider from "firebase/FirebaseAuthProvider";
import PythonExecutorProvider from "lib/pyodide/PythonExecutorProvider";
import { firebaseConfig } from "firebase/firebaseClient";

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <PythonExecutorProvider>
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
        </PythonExecutorProvider>
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;
