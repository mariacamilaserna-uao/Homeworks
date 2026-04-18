import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBU5ljw1NGIAx6kfXa-NWnQDLx60rj1Y8",
  authDomain: "challenge-07-52533.firebaseapp.com",
  projectId: "challenge-07-52533",
  storageBucket: "challenge-07-52533.firebasestorage.app",
  messagingSenderId: "512942515305",
  appId: "1:512942515305:web:14794a8b168cd3868c2ef8",
  measurementId: "G-GFRZJPWQ35"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
