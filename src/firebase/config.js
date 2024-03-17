import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGhOAeJBhLbyTCdLsvdES9Ih6xiY0vDyg",
  authDomain: "postapp-bd0f4.firebaseapp.com",
  projectId: "postapp-bd0f4",
  storageBucket: "postapp-bd0f4.appspot.com",
  messagingSenderId: "37907250086",
  appId: "1:37907250086:web:3c4f498549952fd3ce6d67",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const user = auth.currentUser;
