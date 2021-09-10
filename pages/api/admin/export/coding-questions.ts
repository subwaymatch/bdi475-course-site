import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import stringify from "csv-stringify/lib/sync";
import dayjs from "dayjs";

export default async function getCodingQuestionsAsCSV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept get requests
  if (req.method !== "GET") {
    return;
  }

  // if (!(await isAdmin(req))) {
  //   return res.status(403).end(`Insufficient permission to download reports`);
  // }

  try {
    const querySnapshot = await firebaseAdmin
      .firestore()
      .collection("codingQuestions")
      .orderBy("createdAt")
      .get();

    const codingQuestions = [];

    querySnapshot.forEach((codingQuestion) => {
      let docData = codingQuestion.data();

      codingQuestions.push({
        id: codingQuestion.id,
        created_at: docData.hasOwnProperty("createdAt")
          ? dayjs(docData.createdAt.toDate()).format("YYYY-MM-DD HH:mm:ss")
          : dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: docData.hasOwnProperty("updatedAt")
          ? dayjs(docData.updatedAt.toDate()).format("YYYY-MM-DD HH:mm:ss")
          : dayjs().format("YYYY-MM-DD HH:mm:ss"),
        title: docData.title,
        text_markdown: docData.textMarkdown,
        starter_code: docData.starterCode,
        solution_code: docData.solutionCode,
        test_code: docData.testCode,
      });
    });

    const csvString = stringify(codingQuestions, {
      columns: [
        "created_at",
        "starter_code",
        "test_code",
        "text_markdown",
        "title",
        "updated_at",
        "id",
        "solution_code",
      ],
      header: true,
    });

    return res.send(csvString);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
