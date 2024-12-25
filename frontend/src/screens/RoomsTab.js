import React, { useEffect, useState, useContext } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../context/AuthContext'

const RoomsTab = () => {
  const { userToken } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:5000/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch rooms');
      }

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Rooms fetch error:', error.message);
      Alert.alert('Error', 'Failed to fetch rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRooms();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const renderRoom = ({ item }) => (
    <Animatable.View animation="fadeIn" duration={500} style={styles.roomItem}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomDetails}>Capacity: {item.capacity}</Text>
      <Text style={styles.roomDetails}>Location: {item.location}</Text>
      <Text style={styles.roomDetails}>
        Projector: {item.has_projector ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.roomDetails}>
        Whiteboard: {item.has_whiteboard ? 'Yes' : 'No'}
      </Text>
      <Text
        style={[
          styles.roomStatus,
          item.status === 'available'
            ? styles.statusAvailable
            : styles.statusUnavailable,
        ]}
      >
        Status: {item.status}
      </Text>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : rooms.length > 0 ? (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRoom}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            /> 
          }
        />
      ) : (
        <Text style={styles.noRoomsText}>No rooms available.</Text>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  desc: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  roomItem: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomDetails: {
    fontSize: 14,
    color: '#666',
  },
  roomStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusAvailable: {
    color: 'green',
  },
  statusUnavailable: {
    color: 'red',
  },
  noRoomsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#aaa',
  },

});

export default RoomsTab;
