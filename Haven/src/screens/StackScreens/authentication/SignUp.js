import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../../auth/authFunctions";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage(null); 
    setIsLoading(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigation.navigate("Word");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome !</Text>

            <Text style={styles.subtitle}>Create your account</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                style={styles.inputControl}
                placeholder="Email"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                autoCorrect={false}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignUp}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.formFooter}>
                Already have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skipContainer}>
            <TouchableOpacity
              style={styles.skip}
              onPress={() => {
                navigation.navigate("Tabs", { screen: "Word" });
              }}
            >
              <Text style={styles.btnText}>Skip for now</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {isLoading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#a7d6b8" />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
    fontWeight: "300",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
    color: "#929292",
    textAlign: "center",
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "400",
    color: "#222",
    textAlign: "center",
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    fontWeight: "300",
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    fontWeight: "300",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#a7d6b8",
    borderColor: "#a7d6b8",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "300",
    color: "#fff",
    marginRight: 5,
  },
  skipContainer: {

    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  skip: {
    flexDirection: "row",
    backgroundColor: "#a7d6b8",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
