import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";

const DestinationDetailModal = ({ isVisible, onClose, destination }) => {
  if (!destination) return null;
  return (
    <Modal visible={isVisible} animationType="slide">
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Destination Details</Text>

        {/* Display Detailed Information */}
        <Text>{destination.destinationName}</Text>
        <Text>{destination.address}</Text>
        {/* ... display other properties ... */}

        {/* Add Buttons for Further Actions (Edit, Delete, etc.) */}

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DestinationDetailModal;

const styles = StyleSheet.create({
  // Add styles for modalContainer, title, closeButton, etc.
});
