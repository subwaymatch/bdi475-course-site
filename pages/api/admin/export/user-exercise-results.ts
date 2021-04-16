import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { isAdmin } from "utils/api/auth";
import _ from "lodash";
import stringify from "csv-stringify/lib/sync";
import dayjs from "dayjs";

export default async function getUserExerciseResultsAsCSV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept get requests
  if (req.method !== "GET") {
    return;
  }

  if (!(await isAdmin(req))) {
    return res.status(403).end(`Insufficient permission to download reports`);
  }
  // Extract attempt information
  const {
    query: { qid },
  } = req;

  // If only one qid is supplied, convert it to an array
  const qids = qid ? [].concat(qid) : [];

  try {
    const userRecords = await firebaseAdmin.auth().listUsers();
    const users = userRecords.users.map((u) => ({
      uid: u.uid,
      email: u.email,
    }));
    const uidEmailMap = _.keyBy(users, "uid");

    const querySnapshot = await firebaseAdmin
      .firestore()
      .collection("questionAttempts")
      .where(firebaseAdmin.firestore.FieldPath.documentId(), "in", qids)
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

        const firstSuccessAttempt = _.find(
          userExerciseAttempts,
          (o) => o.isSuccess
        );

        const lastSuccessAttempt = _.findLast(
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
