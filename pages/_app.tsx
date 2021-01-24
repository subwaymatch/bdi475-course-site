import type { AppProps } from "next/app";
import AuthProvider from "firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
import "styles/globals.scss";

// Toastify default & custom styles
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
