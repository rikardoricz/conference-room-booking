import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import DatePicker from '../components/DatePicker';

import Header from '../components/Header';

const ReservationsTab = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch reservations from API
    setReservations([ /* Example reservations data */ ]);
  }, []);

  const renderReservation = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text>{item.room}</Text>
      <Text>{item.date}</Text>
      <Text>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reservations" />
      <DatePicker
      />

      <FlatList
        data={reservations.filter(reservation => reservation.date === selectedDate)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReservation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reservationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ReservationsTab;
