import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../config/firebase";
import { useAuth } from "../auth/authContext";
import { getAuth, deleteUser } from "firebase/auth";
import { doSignOut } from "../auth/authFunctions";
import { doc, getDoc } from "firebase/firestore";

const Delete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const FIRESTORE_DB = db;
  const FIREBASE_AUTH = auth;
  const userId = currentUser ? currentUser.uid : null;
  const user = FIREBASE_AUTH.currentUser;

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Validate email and password (not implemented here, but recommended)
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);

      const profileCollection = collection(FIRESTORE_DB, "users");
      const q = query(profileCollection, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      const deletionPromises = querySnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deletionPromises);
      await user.delete();
      await doSignOut();
    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please try again.";
      } else if (error.code === "auth/requires-recent-login") {
        errorMessage = "Please log in again to delete your account.";
      } else {
        errorMessage = "An error occurred. Please try again later.";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.alertMessage}>
        Are you sure you want to delete your account?
      </Text>
      <View style={styles.reauthContainer}>
        <Text style={styles.reauthLabel}>Email</Text>
        <TextInput
          style={styles.inputR}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.reauthLabel}>Password</Text>
        <TextInput
          style={styles.inputR}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={handleDeleteAccount}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Delete Account</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Delete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
  alertMessage: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "300",
    color: "#9a9a9a",
    marginBottom: 20,
  },
  reauthContainer: {
    width: "90%",
  },
  reauthLabel: {
    fontSize: 14,
    fontWeight: "300",
    color: "#989898",
    marginBottom: 10,
  },
  inputR: {
    height: 44,
    backgroundColor: "#EFF1F5",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "300",
    color: "#222",
    marginBottom: 12,
    width: "100%",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#a7d6b8",
    width: "100%",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
