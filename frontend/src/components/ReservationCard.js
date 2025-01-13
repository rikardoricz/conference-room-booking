import React from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReservationCard = ({ title, time, hasProjector, hasWhiteboard, imageUrl, onCancel }) => {
  console.log(imageUrl);
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/19.jpg")} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.infoContainer}>
          <Ionicons name="time-outline" size={15} color="#000000" style={styles.icon} />
          <Text style={styles.info}>{time}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {hasProjector && <Ionicons name="videocam-outline" size={15} color="#000000" />}
          {hasWhiteboard && <Ionicons name="easel-outline" size={15} color="#000000" />}
          {!hasProjector && !hasWhiteboard && (
            <Text style={styles.noEquipmentText}>No Equipment</Text>
          )}
        </View>
        <Text style={styles.seeMore}>See more...</Text>
      </View>
      {onCancel && (
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#CCE6F4',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Lato-Medium',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  time: {
    fontSize: 14,
    color: '#000000',
  },
  location: {
    fontSize: 14,
    color: '#000000',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  seeMore: {
    color: '#000000',
    opacity: 0.5,
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
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
});

export default ReservationCard;
