import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function useUsers() {
  const { user, claims } = useFirebaseAuth();

  const [result, setResult] = useState({
    status: "loading",
    data: {},
    error: "",
  });

  const fetchUsers = async () => {
    if (!user || !claims.admin) {
      return;
    }

    try {
      const token = await user.getIdToken();
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const res = await fetch(`/api/users/list`, options);
      const data = await res.json();

      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: "success",
          data,
          error: "",
        })
      );
    } catch (err) {
      setResult((prevResult) =>
        Object.assign({}, prevResult, {
          status: "error",
          data: {},
          error: err.message,
        })
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user, claims]);

  return result;
}
