import { getAuth, deleteUser } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase"; // Import your Firestore db instance

export async function deleteUser() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return; // Safety check

    const userId = user.uid;

    // 1. Delete Firestore Data
    const notesCollectionRef = collection(db, `users/${userId}/notes`);
    const q = query(notesCollectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // 2. Delete User Account
    await deleteUser(user);
    console.log("User account and data deleted.");
  } catch (error) {
    console.error("Error deleting user account and data:", error);
  }
}
