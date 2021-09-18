import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";
import _ from "lodash";

export default async function getAllUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only admin role should be able to retrieve the user list

  try {
    const userRecords = await firebaseAdmin.auth().listUsers();

    const users = userRecords.users.map((u) => ({
      uid: u.uid,
      email: u.email,
    }));

    res.json(_.keyBy(users, "uid"));
  } catch (err) {
    return res.status(500).end(`Error fetching user list: ${err.message}`);
  }
}
