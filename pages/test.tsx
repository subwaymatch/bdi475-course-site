import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { user } = useFirebaseAuth();
  const [response, setResponse] = useState<any>("No output");

  const checkUser = async () => {
    const token = await user.getIdToken();
    const res = await fetch("/api/coding-question/attempt", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const userInfo = await res.json();

    setResponse(userInfo);
  };

  useEffect(() => {
    if (user) {
      console.log(`user signed in, check user`);
      console.log(user);
      checkUser();
    }
  }, [user]);

  return (
    <>
      <h1>Test_</h1>
      <div>{JSON.stringify(response)}</div>
    </>
  );
}
