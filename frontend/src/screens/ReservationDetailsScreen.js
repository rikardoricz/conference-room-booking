import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import MyButton from '../components/MyButton';
import { Dimensions } from 'react-native';

const ReservationDetailsScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { reservationId, roomId, hasWhiteboard, hasProjector, title, time, location, capacity, roomName } = route.params;

  const handleCancelReservation = () => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await fetch(`http://10.0.2.2:5000/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userToken}`,
                },
              });

              if (!response.ok) {
                const data = await response.json();
                Alert.alert('Error', data.message || 'Failed to cancel reservation.');
                throw new Error('Failed to cancel reservation.');
              }

              Alert.alert('Success', 'Reservation cancelled successfully.');
              navigation.navigate('HomeScreen');
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to cancel reservation.');
            }
          },
        },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const renderEquipmentList = () => {
    const equipmentList = [];
    if (hasProjector) equipmentList.push('Projector');
    if (hasWhiteboard) equipmentList.push('Whiteboard');

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

  return (
    <ScrollView style={styles.mainContainer}>
      <Header title="Reservation Details" />
      <Image source={require("../assets/19.jpg")} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Equipment</Text>
        {renderEquipmentList()}
        
        <View style={styles.roomInfoContainer}>
            <Text style={styles.sectionTitle}>Date: </Text>
            <Text style={styles.description}>{time}</Text>
        </View>
        <View style={styles.roomInfoContainer}>
            <Text style={styles.sectionTitle}>Location: </Text>
            <Text style={styles.description}>{location}</Text>
        </View>
        <View style={styles.roomInfoContainer}>
            <Text style={styles.sectionTitle}>Room number: </Text>
            <Text style={styles.description}>{roomName}</Text>
        </View>
        <View style={styles.roomInfoContainer}>
            <Text style={styles.sectionTitle}>Seats Available: </Text>
            <Text style={styles.description}>{capacity}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <MyButton
            title="Go back"
            backgroundColor="#fff"
            height={52}
            fontSize={20}
            borderRadius={15}
            textColor="#175676"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <MyButton
            title="Cancel"
            backgroundColor="#D62839"
            height={52}
            fontSize={20}
            borderRadius={15}
            onPress={handleCancelReservation}
          />
        </View>
      </View>
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
  roomInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
});

export default ReservationDetailsScreen;
