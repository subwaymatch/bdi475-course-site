import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*

Copy/paste your *client-side* Firebase credentials below. 

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

*/
const CLIENT_CONFIG = {
  apiKey: "AIzaSyAFlZ1khxa2kNdQe8TZV5jBINZ1Zguv79Q",
  authDomain: "bdi475-2021sp.firebaseapp.com",
  databaseURL: "https://bdi475-2021sp-default-rtdb.firebaseio.com",
  projectId: "bdi475-2021sp",
  storageBucket: "bdi475-2021sp.appspot.com",
  messagingSenderId: "371365753016",
  appId: "1:371365753016:web:0aedd91148e154e663044d",
};

// The firebase.apps.length check is a clever way of preventing Next.js from accidentally re-initalizing your SDK when Next.js hot reloads your application!
if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient.firestore();
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
