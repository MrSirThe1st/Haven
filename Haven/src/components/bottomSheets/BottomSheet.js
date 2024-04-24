import React, { useState, useRef } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const sheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <Button
        title={isBottomSheetOpen ? "Close Sheet" : "Open Sheet"}
        onPress={() => {
          sheetRef.current.open(); // Or sheetRef.current.close();
          setIsBottomSheetOpen(!isBottomSheetOpen);
        }}
      />
      <RBSheet
        ref={sheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: styles.bottomSheetContent,
        }}
      >
        <Text></Text>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    width: "80%",
  },
});

export default BottomSheet;
