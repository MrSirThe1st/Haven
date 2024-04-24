import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  TextInput,
  Touchable,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { topics } from "../../data/Topics";
import { useTypingEffect } from "../Effects/TyperWriter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OpenAI from "openai";
import { API_KEY } from "@env";
import { addDataToCollection } from "../../functions/firestoreUpload";
import { useAuth } from "../../auth/authContext";
import Toast from "react-native-toast-message";


const Topics = React.memo(({ navigation }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;
  const { userLoggedIn } = useAuth();

  //api logic

  const handleSendMessage = async (clickedPrompt = "") => {
    const actualPrompt = clickedPrompt || prompt;

    setPrompt("");
    Keyboard.dismiss();
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const openai = new OpenAI({ apiKey: API_KEY });
        const assistant = await openai.beta.assistants.retrieve(
          "asst_Kdy0CACk8BvEctsKsVvJe8rj"
        );

        const assistantId = assistant.id;
        console.log("Retrieved Assistant with Id:", assistantId);

        const thread = await openai.beta.threads.create({
          messages: [
            {
              role: "user",
              content: actualPrompt,
            },
          ],
        });

        const threadId = thread.id;
        console.log("Created thread with Id:", threadId);

        const run = await openai.beta.threads.runs.createAndPoll(threadId, {
          assistant_id: assistantId,
        });

        console.log("Run finished with status:", run.status);

        if (run.status === "completed") {
          const messages = await openai.beta.threads.messages.list(threadId);
          let finalResponse = "";
          for (const message of messages.getPaginatedItems()) {
            console.log("HERE IS THE MESSAGE", message.content);
            if (
              message.content &&
              message.content[0] &&
              message.content[0].text &&
              message.content[0].text.value &&
              !finalResponse
            ) {
              finalResponse += `${message.content[0].text.value}\n\n`;
            }
          }
          setResponse(finalResponse); // Update the response state directly
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  //api logic
  async function saveResponseToFirestore(userId, response) {
    if (!response || !userId) return;

    setIsLoading(true);

    try {
      const uploadResult = await addDataToCollection(`users/${userId}/notes`, {
        response: response,
        timestamp: new Date(),
      });

      if (uploadResult) {
        console.log("Response saved to Firestore!");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Verse saved to notes",
        });
      } else {
        console.error("Failed to save response.");
      }
    } catch (error) {
      console.error("Error uploading to Firestore:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTyping((value) => !value);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const textToType = isTyping ? "How are you feeling today?" : "";
  const textFromTypingEffect = useTypingEffect(textToType, 90);

  const LinearGradientComponent = ({ children }) => (
    <LinearGradient
      start={{ x: 0.01, y: 0.25 }}
      end={{ x: 0.99, y: 0.9 }}
      locations={[0.6, 0.99]}
      colors={["#e0e7e1", "#a7d6b8"]}
      style={[
        styles.linearGradient,
        { width: imageWidth, height: imageHeight, borderRadius: 20 },
      ]}
    >
      {children}
    </LinearGradient>
  );

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const itemWidth = windowWidth / 2.5;
  const itemHeight = windowHeight / 2.0;
  const textHeight = windowHeight / 2.5;
  const textWidth = windowWidth / 1.4;
  const imageWidth = itemWidth - 24;
  const imageHeight = imageWidth * 0.7;
  const messageHeight = itemHeight;
  const messageWidth = windowWidth / 1.2;

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.containerS}>
          <View style={styles.Sheet}>
            <TextInput
              style={styles.textInput}
              placeholder={textFromTypingEffect}
              value={prompt}
              onChangeText={setPrompt}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSendMessage(prompt)}
              disabled={!prompt}
            >
              <FontAwesome
                name="send"
                size={36}
                color={prompt ? "#a7d6b8" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topics.map((topic) => (
            <TouchableOpacity
              style={[styles.pressable, { width: itemWidth }]}
              key={topic.id}
              onPress={() => {
                handleSendMessage(topic.name);
              }}
            >
              <LinearGradientComponent>
                <Text style={styles.topicTitle}>{topic.name}</Text>
                <View style={styles.divider} />
                <Text style={styles.topicName}>{topic.text}</Text>
                <FontAwesome name="arrow-right" size={20} color="#f3c283" />
              </LinearGradientComponent>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            ...styles.messageContainer,
            height: messageHeight,
            width: messageWidth,
          }}
        >
          {isLoading ? ( // Show loading indicator if isLoading is true
            <ActivityIndicator size="large" color="#a7d6b8" />
          ) : (
            <View
              style={{
                height: textHeight,
                width: textWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.messageText}>
                  {response ? response : "Nothing to show yet"}
                </Text>
              </ScrollView>
            </View>
          )}
          <View style={styles.messageButtons}>
            <TouchableOpacity
              style={[
                styles.individualtButton,
                response ? null : styles.disabledButton,
              ]}
              onPress={async () => {
                if (currentUser) {
                  await saveResponseToFirestore(userId, response);
                } else {
                  Toast.show({
                    type: "info",
                    text1: "Info",
                    text2: "Please create an account to save the note",
                  });
                }
              }}
              disabled={!response}
            >
              <FontAwesome5
                name="book-open"
                size={24}
                color={response ? "#a7d6b8" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
});

export default Topics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
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
  },
  text: {
    margin: 10,
    fontWeight: "300",
    fontSize: 20,
  },

  linearGradient: {
    padding: 10,
    justifyContent: "space-evenly",
  },
  topicTitle: {
    fontWeight: "400",
    fontSize: 18,
  },
  topicName: {
    fontWeight: "300",
    fontSize: 9,
  },
  textInput: {
    width: "80%",
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
    marginRight: 10,
  },
  Sheet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerS: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  button: {
    borderRadius: 10,
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
    marginBottom: 10,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 20,
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "relative",
  },
  messageText: {
    fontSize: 15,
    fontWeight: "300",
  },
  messageButtons: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  individualtButton: {
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
    borderRadius: 99,
    padding: 10,
    marginHorizontal: 10,
  },
});
