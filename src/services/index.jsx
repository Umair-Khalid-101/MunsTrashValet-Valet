import { initializeApp } from "@firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  orderBy,
} from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { firebaseConfig } from "../constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "@firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage
const storage = getStorage(app);

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  query,
  where,
  getDoc,
  orderBy,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
};
