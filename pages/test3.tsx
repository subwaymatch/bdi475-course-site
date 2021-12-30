import { supabaseClient } from "lib/supabase/supabaseClient";

export default function Profile({ user }) {
  return <div>{JSON.stringify(user)}</div>;
}

export async function getServerSideProps({ req }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user } };
}
