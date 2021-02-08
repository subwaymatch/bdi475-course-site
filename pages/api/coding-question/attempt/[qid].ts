import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { IVerifiedUserInfo, getUserInfoFromRequest } from "utils/api/auth";
import _ from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") return;

  const {
    query: { qid },
    body: { isSuccess, userCode },
  } = req;

  try {
    const userInfo: IVerifiedUserInfo = await getUserInfoFromRequest(req);
    const attemptInfo = {
      isSuccess,
      userCode,
      submittedAt: firebaseAdmin.firestore.Timestamp.now(),
    };

    const userAttemptDocRef = await firebaseAdmin
      .firestore()
      .collection("userAttempts")
      .doc(userInfo.uid);

    const questionAttemptDocRef = await firebaseAdmin
      .firestore()
      .collection("questionAttempts")
      .doc(qid as string);

    await firebaseAdmin.firestore().runTransaction((transaction) => {
      return new Promise((resolve, reject) => {
        try {
          transaction.set(
            userAttemptDocRef,
            {
              [qid as string]: firebaseAdmin.firestore.FieldValue.arrayUnion(
                attemptInfo
              ),
            },
            { merge: true }
          );

          transaction.set(
            questionAttemptDocRef,
            {
              [userInfo.uid]: firebaseAdmin.firestore.FieldValue.arrayUnion(
                attemptInfo
              ),
            },
            { merge: true }
          );

          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    });

    return res.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).end("Error recording attempt");
  }
}
