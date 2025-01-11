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
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header';
import MyButton from '../components/MyButton';

const RoomDetailsScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { roomId, date, startTime, endTime, participants } = route.params;
  const [room, setRoom] = useState(null);
  const [meetingName, setMeetingName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchRoomDetails();
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
          <Image source={{ uri: room.photo }} style={styles.roomImage} />
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  roomImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  equipmentList: {
    marginBottom: 5,
  },
  equipmentItem: {
    marginBottom: 5,
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

});

export default RoomDetailsScreen;

