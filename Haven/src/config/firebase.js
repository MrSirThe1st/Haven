import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY_FIREBASE } from "@env";

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: "health-8fcc7.firebaseapp.com",
  projectId: "health-8fcc7",
  storageBucket: "health-8fcc7.appspot.com",
  messagingSenderId: "144600049736",
  appId: "1:144600049736:web:bf576dfac2943eaf53107d",
  measurementId: "G-09TP91Y4L1",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export { app, auth };
