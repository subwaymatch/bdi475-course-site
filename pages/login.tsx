import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";
import Login from "components/Login";
import useFirebaseAuth from "hooks/useFirebaseAuth";

export default function LoginPage() {
  const { user } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Layout>
      <Login />
    </Layout>
  );
}
