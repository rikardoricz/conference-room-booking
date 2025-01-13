import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MeetingCard = ({ title, time, location, onCancel }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <Ionicons name="time-outline" size={14} color="#000000" style={styles.icon} />
        <Text style={styles.info}>{time}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="location-outline" size={14} color="#000000" style={styles.icon} />
        <Text style={styles.info}>{location}</Text>
      </View>

      {/* Dodanie przycisku "Cancel" */}
      {onCancel && (
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#CCE6F4',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },  // Mniejsza wartość przesunięcia
    shadowOpacity: 0.2,  // Wyższa opacity dla mocniejszego cienia
    shadowRadius: 6,  // Miękki cień

    // Shadow for Android
    elevation: 5,  // Możesz zwiększyć tę wartość w razie potrzeby
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 0,
    marginHorizontal: 10,
    fontFamily: 'Lato_400Regular',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 5,
  },
  icon: {
    marginLeft: 10,
    marginRight: 4,
  },
  info: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Lato_400Regular',
  },
  cancelButton: {
    position: 'absolute',
    right: 10, 
    bottom: 10, 
    backgroundColor: '#D62839',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
});


export default MeetingCard;
