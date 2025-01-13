import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyButton from './MyButton';
import { AuthContext } from '../context/AuthContext'

const ManageRoomsModal = ({ visible, onClose }) => {
  const { userToken } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:5000/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms.');
      }
      const data = await response.json();
      console.log(data);
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error.response || error);
      Alert.alert('Error', 'Failed to fetch rooms.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/delete-room`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({room_id: roomId}),
      });

      if (!response.ok) {
        throw new Error('Failed to delete room.');
      }

      const data = await response.json();
      Alert.alert('Success', data.msg);
      setRooms(rooms.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error.response || error);
      Alert.alert('Error', 'Failed to delete room.');
    }
  };

  useEffect(() => {
    if (visible) {
      fetchRooms();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Rooms</Text>

            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              <FlatList
                data={rooms}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.roomItem}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <MyButton
                      title="Delete"
                      backgroundColor="#D62839"
                      borderColor="#D62839"
                      height={40}
                      fontSize={16}
                      borderRadius={10}
                      onPress={() => handleDeleteRoom(item.id)}
                    />
                  </View>
                )}
              />
            )}
          </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomName: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default ManageRoomsModal;
