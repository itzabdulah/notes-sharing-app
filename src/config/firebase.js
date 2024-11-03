import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  // authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  // projectId: process.env.REACT_APP_FIREBASE_projectId,
  // storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  // appId: process.env.REACT_APP_FIREBASE_appId,
  // measurementId: process.env.REACT_APP_FIREBASE_measurementId,

  apiKey: "AIzaSyBPi08alPwTC9iVGOzy6Z62kbtK-cLJpUk",
  authDomain: "notes-sharing-e7cfc.firebaseapp.com",
  projectId: "notes-sharing-e7cfc",
  storageBucket: "notes-sharing-e7cfc.firebasestorage.app",
  messagingSenderId: "599082807113",
  appId: "1:599082807113:web:237a5f1a1b9c8140e6f498",
  measurementId: "G-C3VV3XKWX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


export { auth, analytics, firestore, storage }

