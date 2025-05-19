// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCvAOqcm5lasjG2qRkUIflg_NP488zKiU",
  authDomain: "bee-productive-ab384.firebaseapp.com",
  projectId: "bee-productive-ab384",
  storageBucket: "bee-productive-ab384.firebasestorage.app",
  messagingSenderId: "711790421388",
  appId: "1:711790421388:web:c073cf5d05833bd61ae2a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
