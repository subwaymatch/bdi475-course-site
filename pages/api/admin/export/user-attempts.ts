import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import keyBy from "lodash/keyBy";
import find from "lodash/find";
import findLast from "lodash/findLast";
import stringify from "csv-stringify/lib/sync";
import dayjs from "dayjs";

export default async function getUserChallengeAttemptsAsCSV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept get requests
  if (req.method !== "GET") {
    return;
  }

  // Extract attempt information
  const {
    query: { cid },
  } = req;

  // If only one qid is supplied, convert it to an array
  const challengeIds = cid ? [].concat(cid) : [];

  try {
    const userRecords = await firebaseAdmin.auth().listUsers();
    const users = userRecords.users.map((u) => ({
      uid: u.uid,
      email: u.email,
    }));
    const uidEmailMap = keyBy(users, "uid");

    const querySnapshot = await firebaseAdmin
      .firestore()
      .collection("questionAttempts")
      .where(firebaseAdmin.firestore.FieldPath.documentId(), "in", challengeIds)
      .get();

    const userExerciseResults = [];

    querySnapshot.forEach((questionAttemptsDoc) => {
      const qid = questionAttemptsDoc.id;
      let docData = questionAttemptsDoc.data();

      Object.keys(docData).forEach((uid) => {
        // Sort user exercise attempts by submission timestamp
        const userExerciseAttempts = [...docData[uid]].sort((a, b) => {
          if (a.submittedAt < b.submittedAt) {
            return -1;
          } else if (a.submittedAt > b.submittedAt) {
            return 1;
          } else {
            return 0;
          }
        });

        const firstSuccessAttempt = find(
          userExerciseAttempts,
          (o) => o.isSuccess
        );

        const lastSuccessAttempt = findLast(
          userExerciseAttempts,
          (o) => o.isSuccess
        );

        userExerciseResults.push({
          qid,
          uid,
          email: uidEmailMap[uid]["email"],
          success: userExerciseAttempts.reduce((acc, o) => {
            return o.isSuccess === true ? acc + 1 : acc;
          }, 0),
          fail: userExerciseAttempts.reduce((acc, o) => {
            return o.isSuccess === false ? acc + 1 : acc;
          }, 0),
          is_success: userExerciseAttempts.some((o) => o.isSuccess),
          attempt: userExerciseAttempts.length,
          first_success: firstSuccessAttempt
            ? dayjs(firstSuccessAttempt.submittedAt.toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          last_success: lastSuccessAttempt
            ? dayjs(lastSuccessAttempt.submittedAt.toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
        });
      });
    });

    const csvString = stringify(userExerciseResults, {
      columns: [
        "qid",
        "uid",
        "email",
        "success",
        "fail",
        "attempt",
        "is_success",
        "first_success",
        "last_success",
      ],
      header: true,
    });

    // 'Content-Type': 'text/csv' header is set in next.config.js since NextApiResponse object does not support setting custom headers
    return res.send(csvString);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
