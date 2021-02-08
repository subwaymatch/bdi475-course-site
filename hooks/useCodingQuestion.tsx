import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";

export default function useCodingQuestion(qid) {
  const { user } = useFirebaseAuth();

  const [data, setData] = useState();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestionData();
  }, []);

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

      const res = await fetch(`/api/coding-question/${qid}`, options);

      setStatus("success");
      setData(await res.json());
      setError("");
    } catch (err) {
      setStatus("error");
      setData(null);
      setError(err.message);
    }
  };

  return {
    status,
    data,
    error,
  };
}
