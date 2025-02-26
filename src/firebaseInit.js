import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFQ7mHtu5ITMnrpN0EjN4MkFZd5wTuUok",
  authDomain: "photofolio-58041.firebaseapp.com",
  projectId: "photofolio-58041",
  storageBucket: "photofolio-58041.firebasestorage.app",
  messagingSenderId: "451452614141",
  appId: "1:451452614141:web:9e0262b95d65aa6a711594"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };