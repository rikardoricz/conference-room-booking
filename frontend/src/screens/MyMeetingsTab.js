import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import MeetingDate from '../components/MeetingDate';  
import MeetingCard from '../components/MeetingCard';  
import moment from 'moment';

const MyMeetingsTab = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: 'Marketing Plans',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(),
      reservation_user_id: 1, 
    },
    {
      id: 2,
      name: 'Python Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), 
      reservation_user_id: 2, 
    },
    {
      id: 3,
      name: 'Git Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), 
      reservation_user_id: 1, 
    },
    {
      id: 4,
      name: 'Python Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 2)), 
      reservation_user_id: 2,
    },
  ]);

  const userId = 1; // ID zalogowanego użytkownika

  // Grupuje spotkania według daty
  const groupMeetingsByDate = (meetings) => {
    const groupedMeetings = {};

    meetings.forEach((meeting) => {
      const meetingDate = moment(meeting.date).format('YYYY-MM-DD');
      if (!groupedMeetings[meetingDate]) {
        groupedMeetings[meetingDate] = [];
      }
      groupedMeetings[meetingDate].push(meeting);
    });

    return groupedMeetings;
  };

  const groupedMeetings = groupMeetingsByDate(meetings);

  // Renderowanie MeetingCard z przyciskiem "Cancel", jeśli reservation_user_id pasuje do user_id
  const renderMeeting = ({ item }) => (
    <MeetingCard
      title={item.name}
      time={item.time}
      location={item.location}
      // Przekazywanie onCancel, jeśli reservation_user_id odpowiada userId
      onCancel={item.reservation_user_id === userId ? () => handleCancel(item.id) : null}
    />
  );

  const handleCancel = (meetingId) => {
    // Logika anulowania spotkania
    console.log(`Cancelled meeting with ID: ${meetingId}`);
    // Tutaj należy dodać logikę wysyłania żądania anulowania do serwera
  };

  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(groupedMeetings).map((date) => (
        <View key={date}>
          <MeetingDate date={new Date(date)} />
          <FlatList
            data={groupedMeetings[date]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMeeting}
          />
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default MyMeetingsTab;
