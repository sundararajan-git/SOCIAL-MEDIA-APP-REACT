import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthcontext";

export const useAuthentication = () => {
  const [err, setErr] = useState(null);
  const { dispatch } = useAuthContext();
  const register = ({ username, email, password, confirmPassword }) => {
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, {
          userId: user.uid,
          displayName: username,
          email,
          password,
          confirmPassword,
        });
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErr(errorMessage);
      });
  };
  const logIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        setErr(error.Message);
      });
  };
  return { err, register, logIn, logout };
};
