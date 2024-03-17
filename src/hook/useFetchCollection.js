import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, user } from "../firebase/config";

export const useFetchCollection = (fbcollection) => {
  const [documents, setDocuments] = useState([]);
  const [isloading, setIsloading] = useState(null);
  useEffect(() => {
    setIsloading(true);
    let collectionRef = collection(db, fbcollection);
    let queryRef = query(collectionRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
      setIsloading(null);
    });
    return () => unsub();
  }, [fbcollection]);
  return { documents, isloading };
};
