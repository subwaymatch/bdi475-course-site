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
import { UserContextProvider } from "context/UserContext";
import { supabaseClient } from "lib/supabase/supabaseClient";
import marked from "marked";
import hljs from "highlight.js/lib/core";
import python from "node_modules/highlight.js/lib/languages/python";
import sql from "node_modules/highlight.js/lib/languages/sql";
import plaintext from "node_modules/highlight.js/lib/languages/plaintext";

const supportedLanguages = ["python", "sql", "plaintext"];

hljs.registerLanguage("python", python);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("plaintext", plaintext);

// Add syntax highlighting option
// TODO: Consider switching to markdown-it for LaTeX rendering
marked.setOptions({
  highlight: function (code, lang) {
    const language =
      supportedLanguages.includes(lang) && hljs.getLanguage(lang)
        ? lang
        : "plaintext";

    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <UserContextProvider supabaseClient={supabaseClient}>
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
        </UserContextProvider>
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
}

export default App;
