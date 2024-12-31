import React, { useState } from 'react';
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
      date: new Date(), // Obiekt Date
    },
    {
      id: 2,
      name: 'Python Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Jutro
    },
    {
      id: 3,
      name: 'Python Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Jutro
    },
    {
      id: 4,
      name: 'Python Lecture',
      time: '15:00 - 16:30',
      location: 'Room C-33. 314',
      date: new Date(new Date().setDate(new Date().getDate() + 2)), // Pojutrze
    },
    // Inne spotkania...
  ]);

  // Grupowanie spotkań po dacie
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

  // Użycie komponentu MeetingCard
  const renderMeeting = ({ item }) => (
    <MeetingCard 
      title={item.name} 
      time={item.time} 
      location={item.location} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(groupedMeetings).map((date) => {
        // Użycie moment() do konwersji klucza na obiekt Date
        const dateObject = moment(date, 'YYYY-MM-DD').toDate();  // Zamiana stringu na Date
        return (
          <View key={date}>
            <MeetingDate date={dateObject} /> {/* Przekazanie obiektu Date */}
            <FlatList
              data={groupedMeetings[date]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMeeting}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default MyMeetingsTab;
