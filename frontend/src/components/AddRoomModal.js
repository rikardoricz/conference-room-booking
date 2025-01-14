import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MyButton from './MyButton';
import InputField from './InputField';
import EquipmentItem from './EquipmentItem';
import { AuthContext } from '../context/AuthContext'
import { API_BASE_URL } from '../config/apiConfig';

const AddRoomModal = ({ visible, onClose }) => {
  const { userToken } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [hasProjector, setHasProjector] = useState(false);
  const [hasWhiteboard, setHasWhiteboard] = useState(false);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);

  const clearForm = () => {
    setName('');
    setCapacity('');
    setLocation('');
    setHasProjector(false);
    setHasWhiteboard(false);
    setStatus('Available');
  };

  const validateForm = () => {
    if (!name || !capacity || !location || !status) {
      Alert.alert(
        "Missing Information",
        "Please fill all required fields: name, capacity, location",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const handleAddRoom = async () => {
    if (!validateForm()) return;

    try {
      const newRoom = {
        name,
        capacity: parseInt(capacity, 10),
        location,
        has_projector: hasProjector,
        has_whiteboard: hasWhiteboard,
        status,
      };

      const response = await fetch(`${API_BASE_URL}/add-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newRoom),
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', data.msg || 'Failed to add room.'); 
        throw new Error('Failed to add room.');
      }

      Alert.alert('Success', 'Added new room.');
      onClose();
      clearForm();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add the room.');
    }
    console.log("New Room:", newRoom);
    clearForm();
    onClose();
  };

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
              <SafeAreaView style={styles.container}>
                <Text style={styles.modalTitle}>Add Room</Text>
                
                {/* name */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <InputField
                    value={name}
                    onValueChange={setName}
                    placeholder="Enter room name"
                    style={{ width: '100%' }}
                  />
                </View>

                {/* capacity */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Capacity</Text>
                  <InputField
                    value={capacity}
                    onValueChange={setCapacity}
                    keyboardType="numeric"
                    placeholder="Enter capacity"
                    minValue={1}
                    style={{ width: '100%' }}
                  />
                </View>

                {/* location */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Location</Text>
                  <InputField
                    value={location}
                    onValueChange={setLocation}
                    placeholder="Enter location"
                    style={{ width: '100%' }}
                  />
                </View>

                {/* eq */}
                  <Text style={styles.inputLabel}>Equipment</Text>
                  <View style={styles.eq}>
                    <EquipmentItem
                      iconName="videocam-outline"
                      text="Projector"
                      isSelected={hasProjector}
                      onToggle={() => setHasProjector(!hasProjector)}
                    />
                    <EquipmentItem
                      iconName="easel-outline"
                      text="Whiteboard"
                      isSelected={hasWhiteboard}
                      onToggle={() => setHasWhiteboard(!hasWhiteboard)}
                    />
                  </View>

                {/* status */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Status</Text>
                  <DropDownPicker
                    open={open}
                    value={status}
                    items={[
                      { label: 'Available', value: 'available' },
                      { label: 'Maintenance', value: 'maintenance' },
                    ]}
                    setOpen={setOpen}
                    setValue={setStatus}
                    placeholder="Select a status"
                    containerStyle={{
                      marginTop: 8,
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      height: 50,
                    }}
                    dropDownContainerStyle={{
                      borderColor: '#ccc',
                    }}
                  />
                </View>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonWrapper}>
                    <MyButton
                      title="Clear"
                      backgroundColor="#fff"
                      height={52}
                      fontSize={20}
                      borderRadius={15}
                      textColor="#175676"
                      onPress={clearForm}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <MyButton
                      title="Add Room"
                      backgroundColor="#175676"
                      height={52}
                      fontSize={20}
                      borderRadius={15}
                      onPress={handleAddRoom}
                    />
                  </View>
                </View>
              </SafeAreaView>
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  inputWrapper: {
    marginVertical: 8,
  },
  inputLabel: {
    width: '100%',
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  toggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default AddRoomModal;

