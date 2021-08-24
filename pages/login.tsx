import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";
import Login from "components/Auth/Login";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useUser } from "context/UserContext";

export default function LoginPage() {
  const { user } = useUser();
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
