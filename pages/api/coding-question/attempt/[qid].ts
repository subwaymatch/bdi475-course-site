import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { IVerifiedUserInfo, getUserInfoFromRequest } from "utils/api/auth";

export default async function recordAttempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userInfo: IVerifiedUserInfo = null;

  // Only accept POST requests
  if (req.method !== "POST") {
    return;
  }

  // Get user information from Bearer token
  try {
    userInfo = await getUserInfoFromRequest(req);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }

  // Extract attempt information
  const {
    query: { qid },
    body: { isSuccess, userCode },
  } = req;

  try {
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

    // Run transactions
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

    return res.json({ message: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
