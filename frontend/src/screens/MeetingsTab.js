import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  FlatList, 
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import MeetingDate from '../components/MeetingDate';
import MeetingCard from '../components/MeetingCard';
import ScheduleMeetingModal from '../components/ScheduleMeetingModal';
import { AuthContext } from '../context/AuthContext';

const MeetingsTab = () => {
  const { userToken } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUserId = 1; // ID zalogowanego użytkownika (dostosuj do swojego ID)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
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
          date: moment(item.start_time).format('YYYY-MM-DD'),
          reservation_user_id: item.user_id,
        }))
        .filter((meeting) => moment(meeting.date).isSameOrAfter(moment(), 'day'));

        setMeetings(mappedMeetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [userToken]);

  const groupMeetingsByDate = (meetings) => {
    const groupedMeetings = {};

    meetings.forEach((meeting) => {
      const meetingDate = meeting.date;
      if (!groupedMeetings[meetingDate]) {
        groupedMeetings[meetingDate] = [];
      }
      groupedMeetings[meetingDate].push(meeting);
    });


    Object.keys(groupedMeetings).forEach(date => {
      groupedMeetings[date].sort((a, b) => {
        return moment(a.time.split(' - ')[0], 'HH:mm').diff(moment(b.time.split(' - ')[0], 'HH:mm'));
      });
    });

    return groupedMeetings;
  };

  const sortMeetingsByDate = (groupedMeetings) => {
    return Object.keys(groupedMeetings)
      .sort((a, b) => moment(a).diff(moment(b)))
      .reduce((acc, date) => {
        acc.push({ type: 'header', date });
        acc.push(...groupedMeetings[date].map(meeting => ({ ...meeting, type: 'meeting' })));
        return acc;
      }, []);
  };

  const groupedMeetings = groupMeetingsByDate(meetings);
  const flattenedMeetings = sortMeetingsByDate(groupedMeetings);

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
    Alert.alert(
      'Cancel Meeting',
      'Are you sure you want to cancel this meeting?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
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

  const handleSchedulePress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Pasek nagłówka */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Meetings</Text>
      </View>

      <FlatList
        data={flattenedMeetings}
        keyExtractor={(item, index) => `${item.type}-${item.date || item.id}-${index}`}
        renderItem={renderMeetingItem}
      />

      <TouchableOpacity onPress={handleSchedulePress} style={styles.addButton}>
        <Icon name="add-circle" size={64} color="#175676"/>
      </TouchableOpacity>

      <ScheduleMeetingModal 
        visible={modalVisible} 
        onClose={ () => setModalVisible(false)} 
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
  header: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
});

export default MeetingsTab;
