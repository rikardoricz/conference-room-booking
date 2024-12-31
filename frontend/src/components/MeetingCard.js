import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MeetingCard = ({ title, time, location }) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <Ionicons name="time-outline" size={14} color="#666" style={styles.icon} />
          <Text style={styles.info}>{time}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="location-outline" size={14} color="#666" style={styles.icon} />
          <Text style={styles.info}>{location}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CCE6F4', // Niebieskie tło
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  title: { // Ustawienia tytułu
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 0,
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10, 
  },
  info: { // Ustawienia informacji
    fontSize: 14,
    color: '#666',
  },
});

export default MeetingCard;