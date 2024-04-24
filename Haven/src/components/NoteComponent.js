import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NoteComponent = ({ response, timestamp }) => {
  const refBottomSheet = useRef(null);

  const openBottomSheet = () => {
    refBottomSheet.current.open();
  };

  return (
    <View>
      <TouchableOpacity onPress={openBottomSheet} style={styles.noteContainer}>
        {/* <Text style={styles.noteText}>{response.split("\n")[0]}...</Text> */}
        <MaterialCommunityIcons
          name="note-text-outline"
          size={24}
          color="black"
        />
        <Text style={styles.noteTimestamp}>
          Note saved on {timestamp.toDate().toLocaleString()}
        </Text>
      </TouchableOpacity>

      <RBSheet
        ref={refBottomSheet}
        height={320}
        openDuration={250}
        customStyles={{ container: styles.bottomSheetContent }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.bottomSheetText}>{response}</Text>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetText: {
    fontSize: 15,
    fontWeight: "300",
  },
  noteTimestamp: {
    fontSize: 15,
    fontWeight: "300",
    marginLeft:10
  },
  noteContainer:{
    flexDirection:'row',
    alignItems:'center',
  }
});

export default NoteComponent;
