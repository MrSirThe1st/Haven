import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/authContext";
import { getCurrentUserEmail } from "../functions/firestoreUpload";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { doSignOut } from "../auth/authFunctions";

const Settings = () => {
  const [email, setEmail] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await doSignOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  if (currentUser) {
    getCurrentUserEmail(currentUser)
      .then((userEmail) => {
        setEmail(userEmail);
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
      });
  }
}, [currentUser]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.Email}>
          {email && (
            <Text style={{ fontSize: 18, fontWeight: "300" }}>{email}</Text>
          )}
        </View>
        <View style={styles.divider} />
        <View>
          <TouchableOpacity
            style={styles.DeleteButton}
            onPress={() => {
              navigation.navigate("Delete");
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "300" }}>Delete</Text>
            </View>
            <View>
              <Entypo name="chevron-right" size={28} color="#a7d6b8" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View>
          <TouchableOpacity style={styles.DeleteButton} onPress={handleSignOut}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "300" }}>Sign Out</Text>
            </View>
            <View>
              <FontAwesome5 name="door-open" size={24} color="#a7d6b8" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  menu: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
  },
  DeleteButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  Email: {
    padding: 10,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
});
