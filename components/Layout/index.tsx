import Head from "next/head";
import BootstrapBreakpoints from "components/debug/BootstrapBreakpoints";
import colors from "styles/colors.module.scss";
import SiteHeader from "components/SiteHeader";
import SiteFooter from "components/SiteFooter";

interface ILayoutProps {
  children: React.ReactNode;
  excludeHeader?: boolean;
  excludeFooter?: boolean;
}

export default function Layout({
  children,
  excludeHeader,
  excludeFooter,
}: ILayoutProps) {
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
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={colors.green}
        />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content={colors.green} />
      </Head>

      {/* {process.env.NODE_ENV === "development" && <BootstrapBreakpoints />} */}

      {excludeHeader !== true && <SiteHeader />}

      {children}

      {excludeFooter !== true && <SiteFooter />}
    </>
  );
}
