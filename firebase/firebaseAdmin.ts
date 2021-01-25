import * as firebaseAdmin from "firebase-admin";

const privateKey = process.env["FB_PRIVATE_KEY"];
const clientEmail = process.env["FB_CLIENT_EMAIL"];
const projectId = process.env["FB_PROJECT_ID"];

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Check your Firebase credential environment variables.`
  );
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: `https://bdi475-2021sp-default-rtdb.firebaseio.com`,
  });
}

export { firebaseAdmin };
