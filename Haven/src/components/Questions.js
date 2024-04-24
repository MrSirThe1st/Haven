import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const Questions = () => {
  // Sample data for the list
  const data = [
    { id: "1", title: "Question 1", description: "Description for question 1" },
    { id: "2", title: "Question 2", description: "Description for question 2" },
    // Add more items as needed
  ];

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Feather name="arrow-right" size={24} color="#7dac9a" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F0F0F080",

    ...Platform.select({
      ios: {
        shadowColor: "#F0F0F0", // Match the background color with reduced opacity
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5, // Adjust the opacity as needed
        shadowRadius: 4, // Adjust the shadow spread radius as needed
      },
      android: {
        elevation: 3,
        backgroundColor: "#F0F0F0",
      },
    }),
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#777",
  },
  separator: {
    height: 0.5,
    backgroundColor: "black",
    width: "90%",
  },
});
