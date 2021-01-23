import type { AppProps } from "next/app";
import AuthProvider from "firebase/AuthProvider";
import "styles/globals.scss";

// Toastify default & custom styles
import "react-toastify/dist/ReactToastify.css";
import "styles/toastify.custom.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
