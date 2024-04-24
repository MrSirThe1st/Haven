import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchDataFromCollection,
} from "../../functions/firestoreUpload";
import { useAuth } from "../../auth/authContext";
import NoteComponent from "../../components/NoteComponent";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

const Profile = () => {
  const [responses, setResponses] = useState([]);
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    const fetchResponses = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const fetchedData = await fetchDataFromCollection(
            `users/${userId}/notes`
          );
          setResponses(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchResponses();
  }, [userId]);

const handleDeleteNote = async (noteId) => {
  try {
    setIsLoading(true);
    const noteRef = doc(db, `users/${userId}/notes`, noteId);
    await deleteDoc(noteRef);

    const updatedResponses = responses.filter(
      (response) => response.id !== noteId
    );
    setResponses(updatedResponses);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Verse successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
  }finally{
    setIsLoading(false);
  }
};

  const renderNote = ({ item }) => (
    <View>
      <View style={styles.noteContainer}>
        <NoteComponent response={item.response} timestamp={item.timestamp} />
        <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
          <Feather name="trash-2" size={24} color="#a7d6b8" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 18, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            if (currentUser) {
              navigation.navigate("Settings");
            } else {
              Toast.show({
                type: "info",
                text1: "Info",
                text2: "Please create an account first",
              });
            }
          }}
        >
          <SimpleLineIcons name="settings" size={30} color="#a7d6b8" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#a7d6b8" />
      ) : responses.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "300" }}>No saved responses yet</Text>
          {!currentUser ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={styles.formFooter}
            >
              <Text>
                Login or{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Create account{" "}
                </Text>
                to be able to save
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <FlatList
          data={responses}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          style={styles.notes}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  notes: {
    backgroundColor: "white",
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
    padding: 20,
    borderRadius: 12,
  },
  divider: {
    height: 0.5,
    backgroundColor: "grey",
    marginVertical: 10,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
