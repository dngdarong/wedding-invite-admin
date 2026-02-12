import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrxQumodCrEjCLQVYvT2gbh7Xa5vO6XbM",
  authDomain: "wedding-invite-d0ce0.firebaseapp.com",
  projectId: "wedding-invite-d0ce0",
  storageBucket: "wedding-invite-d0ce0.firebasestorage.app",
  messagingSenderId: "257576731878",
  appId: "1:257576731878:web:ae125da8a61ee21ac4e727",
  measurementId: "G-HJT6ETMDHQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
