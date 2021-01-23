import Head from "next/head";
import Header from "components/Header";
import { ToastContainer } from "react-toastify";

type PropTypes = {
  children: React.ReactNode;
  excludeHeader?: boolean;
};

export default function Layout({ children, excludeHeader }: PropTypes) {
  return (
    <>
      <Head>
        <title>BDI 475</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00ff88" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#00ff88" />
      </Head>

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

      {excludeHeader !== true && <Header />}

      {children}
    </>
  );
}
