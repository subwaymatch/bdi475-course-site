import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import stringify from "csv-stringify/lib/sync";

export default async function getUserListAsCSV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept get requests
  if (req.method !== "GET") {
    return;
  }

  try {
    const userRecords = await firebaseAdmin.auth().listUsers();
    const users = userRecords.users.map((u) => ({
      uid: u.uid,
      email: u.email,
    }));

    const csvString = stringify(users, {
      columns: ["uid", "email"],
      header: true,
    });

    // 'Content-Type': 'text/csv' header is set in next.config.js since NextApiResponse object does not support setting custom headers
    return res.send(csvString);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
