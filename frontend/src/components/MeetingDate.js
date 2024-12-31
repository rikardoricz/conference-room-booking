import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const MeetingDate = ({ date }) => {
  const isToday = moment(date).isSame(moment(), 'day');
  const formattedDate = isToday ? 'Today' : moment(date).format('Do [of] MMMM');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
});

export default MeetingDate;
