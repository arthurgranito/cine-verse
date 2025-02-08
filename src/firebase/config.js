import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKC7r86WB5n8_3jUZFNNoTNQywDjbdS9k",
  authDomain: "cineverse-bf32b.firebaseapp.com",
  projectId: "cineverse-bf32b",
  storageBucket: "cineverse-bf32b.firebasestorage.app",
  messagingSenderId: "359117906476",
  appId: "1:359117906476:web:ee652d7e1698b2a6106789",
  measurementId: "G-GQNX96MFQL",
};

const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);

export {
  AUTH,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
};
