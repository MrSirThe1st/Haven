import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleStartPress = async () => {
    try {
      // Set the onboarding completed flag in AsyncStorage
      await AsyncStorage.setItem("@onboarding_completed", "true");

      // Navigate to the "Tabs" navigator first, then to the "Word" screen
      navigation.navigate("Tabs", { screen: "Word" });
    } catch (error) {
      console.error("Error setting onboarding flag:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/image.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
        onLoadEnd={handleImageLoad}
      >
        {imageLoaded && (
          <View style={styles.bottomContainer}>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.subHeading}>
              Verses AI, AI generated verses
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionFirstLine}>
                Get biblical verses recommended to you
              </Text>
              <Text style={styles.descriptionSecondLine}>
                based on your mood
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStartPress}>
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 30,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a7d6b8",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomContainer: {
    height: "45%",
    alignItems: "center",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    margin: 20,
  },
  descriptionContainer: {
    alignItems: "center",
  },
  descriptionFirstLine: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
    fontWeight: "300",
  },
  descriptionSecondLine: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "300",
  },
  heading: {
    fontSize: 30,
    fontWeight: "400",
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "300",
    padding: 10,
  },
});
