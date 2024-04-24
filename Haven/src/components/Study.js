// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
// } from "react-native";
// import React, { useState, useRef, useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useTypingEffect } from "./Effects/TyperWriter";
// import { FontAwesome } from "@expo/vector-icons";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// const Study = () => {
//   const textToType = isTyping ? "paste a verse?" : "";
//   const textFromTypingEffect = useTypingEffect(textToType, 90);
//   const [isTyping, setIsTyping] = useState(true);
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   return (
//     <KeyboardAwareScrollView
//       contentContainerStyle={styles.container}
//       keyboardShouldPersistTaps="handled"
//       enableOnAndroid={true}
//     >
//       <View style={styles.inputContainer}>
//         <View style={styles.Sheet}>
//           <TextInput
//             style={[styles.textInput, styles.textInputCentered]}
//             placeholder={textFromTypingEffect}
//             value={prompt}
//             onChangeText={setPrompt}
//           />
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => handleSendMessage(prompt)}
//           >
//             <FontAwesome name="send" size={30} color="#a7d6b8" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.viewContainer}>
//         <ScrollView style={{ flex: 1 }}>
//           <Text>fe</Text>
//         </ScrollView>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };

// export default Study;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//   },
//   inputContainer: {
//     flex: 0.3,
//     backgroundColor: "white",
//     alignItems: "center",
//   },
//   viewContainer: {
//     flex: 2,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//     borderRadius: 20,
//     width: "90%",
//     height: "85%",
//     marginVertical: 20,
//   },
//   Sheet: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   containerS: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 15,
//   },
//   button: {
//     borderRadius: 10,
//     backgroundColor: "white",
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//     marginBottom: 10,
//   },
//   textInput: {
//     width: "80%",
//     backgroundColor: "#f2f2f2",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//     fontSize: 18,
//     marginRight: 10,
//   },
// });
