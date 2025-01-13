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
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import MeetingDate from '../components/MeetingDate';
import ReservationCard from '../components/ReservationCard'; 
import ScheduleMeetingModal from '../components/ScheduleMeetingModal';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

const ReservationsTab = () => {
  const { userToken, userId } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, [userToken]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/reservations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
  
      const data = await response.json();
  
      const fetchRoomDetails = async (roomId) => {
        try {
          const roomResponse = await fetch(`http://10.0.2.2:5000/rooms/${roomId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          });
  
          if (!roomResponse.ok) {
            throw new Error('Failed to fetch room details');
          }
  
          const roomData = await roomResponse.json();
          return {
            location: roomData.location,
            capacity: roomData.capacity,
            name: roomData.name,
          };
        } catch (error) {
          console.error(`Error fetching details for room ${roomId}:`, error);
          return { location: 'Unknown', capacity: 'Unknown' }; // Jeśli nie uda się pobrać danych pokoju
        }
      };
  
      const mappedReservations = await Promise.all(
        data.map(async (item) => {
          const roomDetails = await fetchRoomDetails(item.room_id);
          return {
            reservationId: item.reservation_id,
            name: item.title,
            roomId: item.room_id,
            time: `${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
            date: moment(item.start_time).format('YYYY-MM-DD'),
            hasProjector: item.has_projector,
            hasWhiteboard: item.has_whiteboard,
            imageUrl: item.link_to_photo,
            reservationUserId: item.user_id,
            location: roomDetails.location,
            capacity: roomDetails.capacity,
            roomName: roomDetails.name,
          };
        })
      );
  
      const filteredReservations = mappedReservations.filter((reservation) =>
        moment(reservation.date).isSameOrAfter(moment(), 'day')
      );
  
      setReservations(filteredReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const groupReservationsByDate = (reservations) => {
    const groupedReservations = {};

    reservations.forEach((reservation) => {
      const reservationDate = reservation.date;
      if (!groupedReservations[reservationDate]) {
        groupedReservations[reservationDate] = [];
      }
      groupedReservations[reservationDate].push(reservation);
    });

    Object.keys(groupedReservations).forEach(date => {
      groupedReservations[date].sort((a, b) => {
        return moment(a.time.split(' - ')[0], 'HH:mm').diff(moment(b.time.split(' - ')[0], 'HH:mm'));
      });
    });

    return groupedReservations;
  };

  const sortReservationsByDate = (groupedReservations) => {
    return Object.keys(groupedReservations)
      .sort((a, b) => moment(a).diff(moment(b)))
      .reduce((acc, date) => {
        acc.push({ type: 'header', date });
        acc.push(...groupedReservations[date].map(reservation => ({ ...reservation, type: 'reservation' })));
        return acc;
      }, []);
  };

  const groupedReservations = groupReservationsByDate(reservations);
  const flattenedReservations = sortReservationsByDate(groupedReservations);

  const renderReservationItem = ({ item }) => {
    if (item.type === 'header') {
      return <MeetingDate date={new Date(item.date)} />; 
    }

    return (
      <ReservationCard
        reservationId={item.reservationId}
        room={item.room}
        roomId={item.roomId}
        title={item.name}
        time={item.time}
        hasProjector={item.hasProjector}
        hasWhiteboard={item.hasWhiteboard}
        location={item.location}
        capacity={item.capacity}
        roomName={item.roomName}
        imageUrl={item.imageUrl}
        onCancel={item.reservationUserId === userId ? () => handleCancel(item.id) : null}
      />
    );
  };

  const handleCancel = (reservationId) => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              // Usuwanie rezerwacji z backendu
              const response = await fetch(`http://10.0.2.2:5000/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userToken}`,
                },
              });

              if (!response.ok) {
                throw new Error('Failed to cancel reservation');
              }

              setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
              console.log(`Cancelled reservation with ID: ${reservationId}`);
            } catch (error) {
              console.error('Error cancelling reservation:', error);
              Alert.alert('Error', 'Failed to cancel the reservation. Please try again.');
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReservations();
    setRefreshing(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Reservations" />

      <FlatList
        data={flattenedReservations}
        keyExtractor={(item, index) => `${item.type}-${item.date || item.id}-${index}`}
        renderItem={renderReservationItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          /> 
        }
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
  },
});

export default ReservationsTab;
