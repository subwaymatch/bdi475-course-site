import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";
import Login from "components/Auth/Login";
import useSupabaseAuth from "hooks/useSupabaseAuth";

export default function LoginPage() {
  const { user } = useSupabaseAuth();
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
