import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button } from 'react-native';
import Calendar from '../components/Calendar';

const ScheduleMeetingTab = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');

  const handleScheduleMeeting = () => {
    // Logika planowania spotkania
    console.log(`Meeting scheduled on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Kalendarz do wyboru daty */}
      <Calendar onSelectDate={(date) => setSelectedDate(date)} selected={selectedDate} />

      <View style={styles.timePicker}>
        <Text>Selected Time: {selectedTime}</Text>
        {/* Picker godzin */}
      </View>

      <Button title="Schedule Meeting" onPress={handleScheduleMeeting} />
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
  timePicker: {
    marginVertical: 20,
  },
});

export default ScheduleMeetingTab;
