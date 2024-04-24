import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { addDataToCollection } from "../../functions/firestoreUpload";
import { useAuth } from "../../auth/authContext";


const DestinationModal = ({ isVisible, onClose, userId, navigation }) => {

  const [namesOfPeople, setNamesOfPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const { currentUser } = useAuth();


  

  const handleConfirmTime = () => {
    setTimePickerVisibility(false);
  };

  const handleAddName = () => {
    setNamesOfPeople([...namesOfPeople, newName]);
    setNewName("");
  };

  const handleSave = async () => {
    const durationInMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const destinationData = {
      destinationName,
      address,
      numberOfPeople,
      namesOfPeople,
      duration,
      duration: durationInMinutes,
    };

    if (currentUser) {
      const uploadSuccess = await addDataToCollection(
        `destinations/${currentUser.uid}/destinations`,
        destinationData
      );

      if (uploadSuccess) {
        onClose();
      } else {
        // Handle upload failure
      }
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <TouchableOpacity onPress={onClose} style={styles.addNameButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSave} style={styles.addNameButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default DestinationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  namesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addNameButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
});
