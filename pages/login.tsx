import { useEffect, useState } from "react";
import nookies from "nookies";
import Layout from "components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { MdDone } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
import { motion } from "framer-motion";
import clickableVariants from "animations/clickableVariants";
import styles from "styles/pages/login.module.scss";
import clsx from "clsx";
import { firebaseAdmin } from "firebase/firebaseAdmin";

import { GetServerSidePropsContext } from "next";
import Login from "components/Login";

export default function LoginPage() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));

    await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } catch (err) {
    return { props: {} };
  }
};
