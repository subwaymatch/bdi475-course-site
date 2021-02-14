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

  return { attempts, updateAttempts };
}
