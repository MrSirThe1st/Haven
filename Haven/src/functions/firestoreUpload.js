import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";

export async function addDataToCollection(collectionPath, data) {
  try {
    const collectionRef = collection(db, collectionPath);
    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
    return true; // Indicate success
  } catch (error) {
    console.error("Error adding document: ", error);
    return false; // Indicate failure
  }
}

export async function fetchDataFromCollection(collectionPath) {
  try {
    const collectionRef = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionRef);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export async function getCurrentUserEmail() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return user.email;
    } else {
      return null; // No user is currently authenticated
    }
  } catch (error) {
    console.error("Error getting current user's email:", error);
    return null;
  }
}



