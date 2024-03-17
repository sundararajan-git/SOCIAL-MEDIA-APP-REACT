import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

export const useFirestore = (fbcollection) => {
  const [document, setDocumet] = useState(null);
  const [err, setErr] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const collectionRef = collection(db, fbcollection);
  const addDocument = async (document) => {
    setIsloading(true);
    try {
      const doc = await addDoc(collectionRef, {
        ...document,
        createdAt: serverTimestamp(),
      });
      setIsloading(null);
    } catch (err) {
      setErr(err.Message);
    }
  };
  const deleteDocument = async (id) => {
    const documentRef = doc(db, fbcollection, id);

    try {
      await deleteDoc(documentRef);
    } catch (err) {
      setErr(err.Message);
    }
  };
  const updateDocument = async (id, document) => {
    const documentRef = doc(db, fbcollection, id);
    try {
      await updateDoc(documentRef, {
        ...document,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      setErr(err.Message);
    }
  };

  return { document, addDocument, err, deleteDocument, updateDocument };
};
