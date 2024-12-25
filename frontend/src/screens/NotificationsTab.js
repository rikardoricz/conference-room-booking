import React, { useContext, useEffect, useState } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native'
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../context/AuthContext'

const NotificationsTab = () => {
  const { userToken } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:5000/notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch notifications');
      }

      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(notifications)) {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Notifications fetch error:', error.message);
      Alert.alert('Error', 'Failed to fetch notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const renderNotification = ({ item }) => (
    <Animatable.View animation="fadeIn" duration={500} style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title || 'No Title'}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>
        Created At: {new Date(item.created_at).toLocaleString()}
      </Text>
      <Text
        style={[
          styles.notificationStatus,
          item.status === 'unread' ? styles.statusUnread : styles.statusRead,
        ]}
      >
        Status: {item.status}
      </Text>
    </Animatable.View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) =>
            item.notification_id?.toString() || index.toString()
          }
          renderItem={renderNotification}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            /> 
          }
        />
      ) : (
        <Text style={styles.emptyText}>No notifications found.</Text>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  desc: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  notificationItem: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  notificationStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusUnread: {
    color: 'red',
  },
  statusRead: {
    color: 'green',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },

});

export default NotificationsTab;
