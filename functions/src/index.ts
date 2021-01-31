import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.autoTimestamp = functions.firestore
  .document("{colId}/{docId}")
  .onWrite(async (change, context) => {
    // The collections to trigger automatic insertion of
    // createdAt/modifedAt timestamps
    const collectionsToTimestamp = ["users", "codingQuestions"];

    // Do nothing if the changed collection is
    // not one of the target collections
    if (collectionsToTimestamp.indexOf(context.params.colId) === -1) {
      return null;
    }

    // Identify event types
    const isDocCreated = !change.before.exists && change.after.exists;
    const isDocUpdated = change.before.exists && change.after.exists;
    const isDocDeleted = change.before.exists && !change.after.exists;

    // Do nothing if the doc is deleted
    if (isDocDeleted) {
      return null;
    }

    // Simplify input data
    const after: any = change.after.exists ? change.after.data() : null;
    const before: any = change.before.exists ? change.before.data() : null;

    // Prevent update loops from triggers
    const canUpdate = () => {
      // If update trigger
      if (before.updatedAt && after.updatedAt) {
        if (after.updatedAt._seconds !== before.updatedAt._seconds) {
          return false;
        }
      }

      // If create trigger
      if (!before.createdAt && after.createdAt) {
        return false;
      }

      return true;
    };

    // If newly created doc, add createdAt
    if (isDocCreated) {
      return change.after.ref
        .set(
          {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch((err: any) => {
          console.error(err);
          return false;
        });
    }

    // If updated doc, add updatedAt
    if (isDocUpdated && canUpdate()) {
      return change.after.ref
        .set(
          {
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch((err: any) => {
          console.error(err);
          return false;
        });
    }

    return null;
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
