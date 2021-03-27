import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

require("dotenv").config();

// firebase init
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
var bucket;
try {
  bucket = firebase.storage();
} catch (e) {
  console.log(e);
}

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  bucket,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
