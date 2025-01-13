import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import { Dimensions} from 'react-native';

const RoomDetailsScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { roomId, date, startTime, endTime, participants } = route.params;
  const [room, setRoom] = useState(null);
  const [meetingName, setMeetingName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchRoomDetails();
    fetchUsers(); 
  }, []);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/rooms/${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch room details.');
      }
      const data = await response.json();
      setRoom(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch room details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/users', { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch users.');
    }
  };

  const renderEquipmentList = () => {
    const equipmentList = [];
    if (room.has_projector) {
      equipmentList.push('Projector');
    }
    if (room.has_whiteboard) {
      equipmentList.push('Whiteboard');
    }

    return (
      <View style={styles.equipmentList}>
        {equipmentList.map((item, index) => (
          <Text key={index} style={styles.equipmentItem}>
            • {item}
          </Text>
        ))}
      </View>
    );
  };

  const handleRoomReservation = async () => {
    setIsModalVisible(true);
  };

  const handleReserve = async () => {
    if (!meetingName) {
      Alert.alert('Error', 'Please enter meeting name');
      return;
    }
    if (selectedUsers.length === 0) {
      Alert.alert("Error", "Please select at least one participant.");
      return;
    }
    console.log("Meeting Name:", meetingName);
    console.log("Selected Users:", selectedUsers);

    try {
      const [day, month, year] = date.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await fetch(`http://10.0.2.2:5000/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          room_id: roomId,
          start_time: `${formattedDate}T${startTime}:00`,
          end_time: `${formattedDate}T${endTime}:00`,
          participants,
          status: 'pending',
          title: `${meetingName}`,
          attendees: selectedUsers,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to reserve room.'); 
        throw new Error('Failed to reserve room.');
      }

      Alert.alert('Success', 'Room reserved successfully.');
      navigation.navigate('HomeScreen'); // go to home screen
      setIsModalVisible(false); 
      setMeetingName(''); 
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to reserve the room.');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Header title="Room description" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : room ? (
        <>
          <Image source={require("../assets/19.jpg")} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <Text style={styles.description}>{room.name}</Text>

            <Text style={styles.sectionTitle}>EQUIPMENT</Text>
              {renderEquipmentList()}

            <Text style={styles.sectionTitle}>Seats Available: {room.capacity}</Text>
          </View>
        </>
      ) : null}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <MyButton 
            title="Go back" 
            backgroundColor="#fff" 
            height={52}
            fontSize={20}
            borderRadius={15}
            textColor="#175676"
            onPress={() => {navigation.goBack()}}
          />
        </View>
          <View style={styles.buttonWrapper}>
            <MyButton 
              title="Reserve" 
              backgroundColor="#175676" 
              height={52}
              fontSize={20}
              borderRadius={15}
              onPress={handleRoomReservation}
            />
          </View>
        </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
      <TouchableWithoutFeedback onPress={() => {setIsModalVisible(false)}}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <SafeAreaView style={styles.container}>
                <Text style={styles.modalTitle}>Enter meeting details</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Enter Meeting Name"
            value={meetingName}
            onChangeText={setMeetingName}
          />

          <MultiSelect
            items={users
              .filter(user => user.username)
              .map(user => ({ id: user.user_id, name: user.username }))
            }
            uniqueKey="id"
            onSelectedItemsChange={setSelectedUsers}
            selectedItems={selectedUsers}
            selectText="Select attendees"
            searchInputPlaceholderText="Search users"
            tagRemoveIconColor="#ccc"
            tagBorderColor="#ccc"
            tagTextColor="#333"
            selectedItemTextColor="#175676"
            selectedItemIconColor="#175676"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{
              color: '#333'
            }}
            // submitButtonColor="#175676"
            // submitButtonText="Done"
            hideSubmitButton
            styleDropdownMenu={{
              marginVertical: 10
            }}
            styleDropdownMenuSubsection={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#CCC',
              padding: 10,
              backgroundColor: '#FFF',
            }}
            styleSelectorContainer={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#CCC',
              backgroundColor: '#FFF',
              paddingVertical: 10,
            }}
          />

          <View style={styles.modalButtonContainer}>
            <MyButton
              title="Cancel"
              backgroundColor="#fff" 
              textColor="#175676"
              height={40}
              fontSize={16}
              borderRadius={10}
              onPress={() => setIsModalVisible(false)}
            />
            <MyButton
              title="Reserve"
              backgroundColor="#175676" 
              height={40}
              fontSize={16}
              borderRadius={10}
              onPress={handleReserve}
            />
          </View>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    width: width,
    height: width,
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  description: {
    marginBottom: 10,
    marginLeft: 10,
  },
  equipmentList: {
    marginBottom: 5,
  },
  equipmentItem: {
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    marginTop: 'auto',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userItemText: {
    fontSize: 16,
  },
  selectedUser: {
    fontWeight: 'bold',
  },

});

export default RoomDetailsScreen;

