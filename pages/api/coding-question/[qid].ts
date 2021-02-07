import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import { isAdmin } from "utils/api/auth";
import _ from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { qid },
  } = req;

  try {
    const snapshot = await firebaseAdmin
      .firestore()
      .collection("codingQuestions")
      .doc(qid as string)
      .get();

    // Throw error if question document does not exist
    if (!snapshot.exists) {
      return res.status(404).end(`Question ID: ${qid} does not exist`);
    }

    let questionData = snapshot.data();

    // Only admin role should be able to retrieve the solution code
    if (!(await isAdmin(req))) {
      questionData = _.omit(questionData, ["solutionCode"]);
    }

    res.json(questionData);
  } catch (err) {
    return res
      .status(500)
      .end(`Error fetching Question ID: ${qid} - ${err.message}`);
  }
}
