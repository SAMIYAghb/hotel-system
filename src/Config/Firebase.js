// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDk_RjJ__CBf0XE7eIK3BAdKOtY2PyOGdY",

  authDomain: "auth-391a8.firebaseapp.com",

  projectId: "auth-391a8",

  storageBucket: "auth-391a8.appspot.com",

  messagingSenderId: "350518640696",

  appId: "1:350518640696:web:9b833ee9eb433b93f5e6cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider
 const auth = getAuth(app);
export  {auth,provider}