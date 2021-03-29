import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function usePythonExercise(qid) {
  const { user } = useFirebaseAuth();

  const [result, setResult] = useState({
    status: "loading",
    data: null,
    error: "",
  });

  const fetchQuestionData = async () => {
    try {
      const token = user ? await user.getIdToken() : null;
      const options = user
        ? {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        : {};

      const res = await fetch(`/api/python-exercise/${qid}`, options);
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
          data: null,
          error: err.message,
        })
      );
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, [user]);

  return result;
}
