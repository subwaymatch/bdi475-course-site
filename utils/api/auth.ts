import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "firebase/firebaseAdmin";

export interface IVerifiedUserInfo {
  uid: string;
  admin: boolean;
  email: string;
}

export function getUserInfoFromRequest(
  req: NextApiRequest
): Promise<IVerifiedUserInfo> {
  return new Promise<IVerifiedUserInfo>(async (resolve, reject) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      try {
        const authToken = req.headers.authorization.split(" ")[1];
        const decodedToken = await firebaseAdmin
          .auth()
          .verifyIdToken(authToken);

        return resolve({
          uid: decodedToken.uid,
          admin: decodedToken.admin,
          email: decodedToken.email,
        });
      } catch (err) {
        return reject(err.message);
      }
    } else {
      return reject(
        new Error("Authorization header missing from request object")
      );
    }
  });
}

export async function isAdmin(req: NextApiRequest): Promise<boolean> {
  try {
    const userInfo: IVerifiedUserInfo = await getUserInfoFromRequest(req);

    console.log(`userInfo`);
    console.log(userInfo);

    return userInfo.admin;
  } catch {
    console.log(`error getting userinfo`);

    return false;
  }
}
