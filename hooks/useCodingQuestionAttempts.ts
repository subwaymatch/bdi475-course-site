import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";
import { ICodingQuestionAttempt } from "typings/coding-question";
import { useFirestore } from "reactfire";
import { firebaseClient } from "firebase/firebaseClient";
import _ from "lodash";

export default function useCodingQuestionAttempts(qid) {
  const { user } = useFirebaseAuth();
  const firestore = useFirestore();
  const [attempts, setAttempts] = useState<ICodingQuestionAttempt[]>([]);

  const updateAttempts = () => {
    if (!user || !qid) {
      return;
    }

    firestore
      .collection("userAttempts")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const docData = doc.data();

        if (_.has(docData, qid)) {
          let questionAttempts = docData[qid].map((o) => {
            o.submittedAt = o.submittedAt
              ? o.submittedAt
              : firebaseClient.firestore.Timestamp.now();

            return o;
          });

          questionAttempts = [...questionAttempts].sort().reverse();

          setAttempts(questionAttempts);
        } else {
          setAttempts([]);
        }
      });
  };

  useEffect(() => {
    if (!user || !qid) {
      setAttempts([]);
      return;
    }

    updateAttempts();
  }, [user, qid]);

  const recordSubmission = async (isSuccess: boolean, userCode: string) => {
    if (!user || !qid) {
      return;
    }

    const token = await user.getIdToken();
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isSuccess,
        userCode,
      }),
    };

    await fetch(`/api/coding-question/attempt/${qid}`, options);

    updateAttempts();
  };

  return { attempts, updateAttempts, recordSubmission };
}
