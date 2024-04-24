import { StatusBar } from "expo-status-bar";
import { AppState, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/navigation/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/auth/authContext";
import Onboarding from "./src/screens/StackScreens/authentication/Onboarding";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNavigation />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

