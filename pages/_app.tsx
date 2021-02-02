import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";

// Toastify default & custom styles
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";

import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";

import { firebaseConfig } from "firebase/firebaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
    </FirebaseAppProvider>
  );
}

export default MyApp;
