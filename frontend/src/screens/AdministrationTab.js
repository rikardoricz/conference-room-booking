import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import AddRoomModal from '../components/AddRoomModal';
import ManageRoomsModal from '../components/ManageRoomsModal';


const AdministrationTab = ({ navigation }) => {
  const [isAddRoomModalVisible, setAddRoomModalVisible] = useState(false);
  const [isManageRoomsModalVisible, setManageRoomsModalVisible] = useState(false);



  const handleManageRooms = () => {
    console.log('Manage Rooms button pressed');
    setManageRoomsModalVisible(true);
    // Add functionality here
  };

  const handleAddRoom = () => {
    console.log('Add Room button pressed');
    setAddRoomModalVisible(true); //
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

  const handleResetPassword = () => {
    console.log('Reset Password button pressed');
    // Add functionality here
  };

  const handleCloseAddRoomModal = () => {
    setAddRoomModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Administration" />
      <View style={styles.buttonContainer}>
        {/* buttons */}
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
      </View>

      {/* modals */}
      <AddRoomModal
        visible={isAddRoomModalVisible}
        onClose={handleCloseAddRoomModal}
      />
      <ManageRoomsModal
        visible={isManageRoomsModalVisible}
        onClose={() => setManageRoomsModalVisible(false)}
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
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
});

export default AdministrationTab;

