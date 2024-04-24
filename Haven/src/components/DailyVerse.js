import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const DailyVerse = () => {
   const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require("../assets/images/cross.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View>
            {/* <Text style={styles.title}>Get verses recommended </Text> */}
            {/* <Text style={styles.title}>based on your feelings</Text> */}
          </View>

          {/* <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Study')}}>
            <Text style={styles.buttonText}>Study now</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};
const CARD_WIDTH = Math.min(Dimensions.get("screen").width * 0.9, 400);
const CARD_HEIGHT = Math.min(Dimensions.get("screen").width * 0.3, 400);

export default DailyVerse;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7dac9a",
    alignItems: "center",
    justifyContent: "center",
    width: CARD_WIDTH * 0.25,
    height: CARD_HEIGHT * 0.25,
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backgroundImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cardContainer: {
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  content: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "space-between",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontWeight: "500",
  },
});
