import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
  if (user) {
    const extractedUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData,
    };
    setCurrentUser(extractedUser);

    const isEmail = user.providerData.some((provider) => provider.providerId === "password");
    setIsEmailUser(isEmail);

    setUserLoggedIn(true);
  } else {
    setCurrentUser(null);
    setUserLoggedIn(false);
  }

  setLoading(false);
}

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}