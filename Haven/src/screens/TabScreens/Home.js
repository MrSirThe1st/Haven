import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyVerse from "../../components/DailyVerse";
import Topics from "../../components/carroussel/Topics";

const Home = () => {

  return (
    <SafeAreaView style={styles.container}>
      <DailyVerse />
      <Topics />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  addNameButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  destinationItem: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 15,
    margin: 10,
    alignItems: "center",
  },
  destinationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
