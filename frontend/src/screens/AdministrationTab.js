import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import AddRoomModal from '../components/AddRoomModal';


const AdministrationTab = ({ navigation }) => {
  const [isAddRoomModalVisible, setAddRoomModalVisible] = useState(false);


  const handleManageRooms = () => {
    console.log('Manage Rooms button pressed');
    // Add functionality here
  };

  const handleAddRoom = () => {
    console.log('Add Room button pressed');
    setAddRoomModalVisible(true); //
    // Add functionality here
  };

  const handleEditRemoveRoom = () => {
    console.log('Edit/Remove Room button pressed');
    // Add functionality here
  };

  const handleManageReservations = () => {
    console.log('Manage Reservations button pressed');
    // Add functionality here
  };

  const handleRemoveReservation = () => {
    console.log('Remove Reservation button pressed');
    // Add functionality here
  };

  const handleManageUsers = () => {
    console.log('Manage Users button pressed');
    // Add functionality here
  };

  const handleAddUser = () => {
    console.log('Add User button pressed');
    // Add functionality here
  };

  const handleResetPassword = () => {
    console.log('Reset Password button pressed');
    // Add functionality here
  };

  const handleCloseAddRoomModal = () => {
    setAddRoomModalVisible(false); // Hide the modal
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Administration" />
      <View style={styles.buttonContainer}>
        {/* Buttons */}
        <View style={styles.buttonWrapper}>
        <MyButton
          title="Add Room"
          backgroundColor="#CCE6F4"
          borderColor="#CCE6F4"
          textColor="#000"
          height={40}
          borderRadius={10}
          fontSize={16}
          onPress={handleAddRoom}
        />
        </View>
        <View style={styles.buttonWrapper}>
        <MyButton
          title="Manage Rooms"
          backgroundColor="#CCE6F4"
          borderColor="#CCE6F4"
          textColor="#000"
          height={40}
          borderRadius={10}
          fontSize={16}
          onPress={handleManageRooms}
        />
        </View>
        <View style={styles.buttonWrapper}>
        <MyButton
          title="Manage Reservations"
          backgroundColor="#CCE6F4"
          borderColor="#CCE6F4"
          textColor="#000"
          height={40}
          borderRadius={10}
          fontSize={16}
          onPress={handleManageReservations}
        />
        </View>
        <View style={styles.buttonWrapper}>
        <MyButton
          title="Manage Users"
          backgroundColor="#CCE6F4"
          borderColor="#CCE6F4"
          textColor="#000"
          height={40}
          borderRadius={10}
          fontSize={16}
          onPress={handleManageUsers}
        />
        </View>
        <View style={styles.buttonWrapper}>
        <MyButton
          title="Add User"
          backgroundColor="#CCE6F4"
          borderColor="#CCE6F4"
          textColor="#000"
          height={40}
          borderRadius={10}
          fontSize={16}
          onPress={handleAddUser}
        />
      </View>
      </View>
      <AddRoomModal
        visible={isAddRoomModalVisible} // Modal visibility state
        onClose={handleCloseAddRoomModal} // Close the modal
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
});

export default AdministrationTab;

