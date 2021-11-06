import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "components/Layout";
import useSupabaseAuth from "hooks/useSupabaseAuth";
import { Auth } from "@supabase/ui";
import { supabaseClient } from "lib/supabase/supabaseClient";
import { Container, Row, Col } from "react-bootstrap";

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
      <section style={{ marginBottom: "8rem" }}>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  marginTop: "4rem",
                }}
              >
                Supabase Auth
              </h3>
              <p
                style={{
                  color: "#aaa",
                  marginBottom: "2rem",
                }}
              >
                Password sign-ins are for instructors, TAs, and admins only.
              </p>
              <Auth supabaseClient={supabaseClient} providers={[]} />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
}
