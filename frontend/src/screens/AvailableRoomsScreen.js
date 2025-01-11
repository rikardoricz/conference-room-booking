import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { globalStyles } from '../styles/GlobalStyles';
import { AuthContext } from '../context/AuthContext'


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

      const response = await fetch(`http://10.0.2.2:5000/rooms/available?startTime=${formattedDate}T${startTime}:00&endTime=${formattedDate}T${endTime}:00&projector=${has_projector}&whiteboard=${has_whiteboard}`, {
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
            <Text style={styles.roomName}>{item.name}</Text>
            <Text>Capacity: {item.capacity}</Text>
            <Text>Location: {item.location}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    textAlign: 'center',
    marginVertical: 20,
  },
  roomCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noRooms: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default AvailableRoomsScreen;

