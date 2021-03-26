import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

require("dotenv").config();

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyBnW06RHWFfosprfeAj2wpmKqMEAgMbMP8",
  authDomain: "sportsweb254.firebaseapp.com",
  projectId: "sportsweb254",
  storageBucket: "sportsweb254.appspot.com",
  messagingSenderId: "184747777118",
  appId: "1:184747777118:web:c75c615c8f548d447768cf",
  measurementId: "G-R3WHR4YV73",
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
