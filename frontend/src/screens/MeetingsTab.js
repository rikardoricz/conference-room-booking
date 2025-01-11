import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, ActivityIndicator, Text, Alert } from 'react-native';
import MeetingDate from '../components/MeetingDate';
import MeetingCard from '../components/MeetingCard';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';

const MeetingsTab = () => {
  const { userToken } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUserId = 1; // ID zalogowanego użytkownika (dostosuj do swojego ID)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`, // Przekazanie tokena autoryzacji
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }

        const data = await response.json();

        const mappedMeetings = data.map((item) => ({
          id: item.reservation_id,
          name: item.description || 'Standard Lecture',
          time: `${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
          location: `Room ${item.room_id}`,
          date: moment(item.start_time).format('YYYY-MM-DD'), // Używamy formatu daty do grupowania
          reservation_user_id: item.user_id,
        }));

        setMeetings(mappedMeetings); // Ustawienie spotkań
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [userToken]);

  // Funkcja do grupowania spotkań po dacie
  const groupMeetingsByDate = (meetings) => {
    const groupedMeetings = {};

    meetings.forEach((meeting) => {
      const meetingDate = meeting.date;
      if (!groupedMeetings[meetingDate]) {
        groupedMeetings[meetingDate] = [];
      }
      groupedMeetings[meetingDate].push(meeting);
    });

    return groupedMeetings;
  };

  const groupedMeetings = groupMeetingsByDate(meetings);

  // Tworzenie listy spotkań z nagłówkami dat
  const flattenedMeetings = Object.keys(groupedMeetings).reduce((acc, date) => {
    acc.push({ type: 'header', date });
    acc.push(...groupedMeetings[date].map(meeting => ({ ...meeting, type: 'meeting' })));
    return acc;
  }, []);

  const renderMeetingItem = ({ item }) => {
    if (item.type === 'header') {
      return <MeetingDate date={new Date(item.date)} />;
    }

    return (
      <MeetingCard
        title={item.name}
        time={item.time}
        location={item.location}
        onCancel={item.reservation_user_id === loggedUserId ? () => handleCancel(item.id) : null}
      />
    );
  };

  const handleCancel = (meetingId) => {
    // Pytanie o potwierdzenie przed usunięciem spotkania
    Alert.alert(
      'Cancel Meeting',
      'Are you sure you want to cancel this meeting?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              // Usuwanie spotkania z backendu
              /* const response = await fetch(`http://10.0.2.2:5000/reservations/${meetingId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userToken}`,
                },
              });

              if (!response.ok) {
                throw new Error('Failed to cancel meeting');
              } */

              // Usuwanie spotkania z frontendowego stanu
              setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== meetingId));
              console.log(`Cancelled meeting with ID: ${meetingId}`);
            } catch (error) {
              console.error('Error cancelling meeting:', error);
              Alert.alert('Error', 'Failed to cancel the meeting. Please try again.');
            }
          },
        },
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flattenedMeetings}
        keyExtractor={(item, index) => `${item.type}-${item.date || item.id}-${index}`}
        renderItem={renderMeetingItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeetingsTab;
