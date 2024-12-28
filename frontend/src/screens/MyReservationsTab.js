import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';
import Calendar from '../components/Calendar';

const MyReservationsTab = () => {
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
      {/* Kalendarz */}
      <Calendar onSelectDate={(date) => setSelectedDate(date)} selected={selectedDate} />

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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  reservationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MyReservationsTab;
