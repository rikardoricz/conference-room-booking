import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const MeetingDate = ({ date }) => {
  // Sprawdzenie, czy data to dzisiaj
  const isToday = moment(date).isSame(moment(), 'day');
  
  // Formatowanie daty: jeśli dzisiaj, pokazuje 'Today', w innym przypadku np. '1st of January'
  const formattedDate = isToday
    ? 'Today'
    : moment(date).format('Do [of] MMMM');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Wyśrodkowanie w poziomie
    justifyContent: 'center', // Wyśrodkowanie w pionie
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeetingDate;
