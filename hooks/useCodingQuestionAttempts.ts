import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useEffect, useState } from "react";
import { ICodingQuestionAttempt } from "typings/coding-question";
import { useFirestore } from "reactfire";
import _ from "lodash";

export default function useCodingQuestionAttempts(qid) {
  const { user } = useFirebaseAuth();
  const firestore = useFirestore();
  const [attempts, setAttempts] = useState<ICodingQuestionAttempt[]>([]);

  useEffect(() => {
    if (!user || !qid) {
      setAttempts([]);
      return;
    }

    updateAttempts();
  }, [user, qid]);

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
          const questionAttempts = docData[qid];

          setAttempts(questionAttempts);
        } else {
          setAttempts([]);
        }
      });
  };

  return { attempts, updateAttempts };
}
