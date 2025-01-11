import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header';
import MyButton from '../components/MyButton';

const RoomDetailsScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { roomId, date, startTime, endTime, participants } = route.params;
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

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
    console.log(`chuj on: ${date}, ${startTime}-${endTime}`);
    console.log(`chuj: ${participants}`);
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
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to reserve room.'); 
        throw new Error('Failed to reserve room.');
      }

      Alert.alert('Success', 'Room reserved successfully.');
      navigation.navigate('HomeScreen'); // go to home screen
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to reserve the room.');
    }
  };

  return (
    <ScrollView style={styles.container}>
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default RoomDetailsScreen;

