import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles/GlobalStyles';
import { AuthContext } from '../context/AuthContext'
import { API_BASE_URL } from '../config/apiConfig';


const AvailableRoomsScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { date, startTime, endTime, participants, equipment } = route.params;
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`Search for rooms on: ${date}, ${startTime}-${endTime}`);
    console.log(`Participants: ${participants}`);
    fetchAvailableRooms();
  }, []);

  const fetchAvailableRooms = async () => {
    setLoading(true);
    try {
      const [day, month, year] = date.split('/');
      const formattedDate = `${year}-${month}-${day}`;
      const has_projector = equipment.projector;
      const has_whiteboard = equipment.whiteboard;

      const response = await fetch(`${API_BASE_URL}/rooms/available?startTime=${formattedDate}T${startTime}:00&endTime=${formattedDate}T${endTime}:00&projector=${has_projector}&whiteboard=${has_whiteboard}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch available rooms.');

      const rooms = await response.json();
      setAvailableRooms(rooms);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch available rooms.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomPress = (roomId) => {
    navigation.navigate('RoomDetails', { roomId, date, startTime, endTime, participants, equipment }); // Navigate to RoomDetails screen with roomId param
  };


  return (
    <View style={styles.container}>
      <Header title="Available Rooms" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : availableRooms.length > 0 ? (
      <FlatList
        data={availableRooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.roomCard} onPress={() => handleRoomPress(item.id)}>
          <View style={styles.imageContainer}>
                  <Image source={require("../assets/19.jpg")} style={styles.image} />
          </View>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomCapacity}>
            <Text style={{ fontWeight: 'bold' }}>👤 {item.capacity}</Text>
            </Text>
            <Text style={styles.roomEquipment}>
              {item.has_projector && 'Projector'}
              {item.has_projector && item.has_whiteboard ? ', ' : ''}
              {item.has_whiteboard && 'Whiteboard'}
            </Text>
            <Text style={styles.seeMore}>See more...</Text>
        </View>
    </TouchableOpacity>
  )}
/>
      ) : (
        <Text style={styles.noRooms}>No rooms available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    textAlign: 'center',
    marginVertical: 20,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D7EEFF',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 8,
  },
  roomInfo: {
    flex: 1,
    marginLeft: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roomCapacity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  roomEquipment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  seeMore: {
    fontSize: 14,
    color: '#63A9FF',
    fontWeight: 'bold',
  },
});

export default AvailableRoomsScreen;

