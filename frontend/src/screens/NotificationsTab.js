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

import MyButton from '../components/MyButton'
import ActionsContainer from '../components/ActionsContainer'
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

  const handleUpdateStatus = async (notificationId, newStatus) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update notification status');
      }

      const updatedNotification = await response.json();
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.notification_id === notificationId
            ? { ...notification, status: newStatus }
            : notification
        )
      );
      console.log('Notification status updated:', updatedNotification);
    } catch (error) {
      console.error('Error updating notification status:', error.message);
      Alert.alert('Error', 'Failed to update notification status. Please try again.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const getTimeAgo = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffM = now - created;
    const diffH = Math.floor(diffM / (1000 * 60 * 60));
  
    if (diffH < 1) {
      const diffMinutes = Math.floor(diffM / (1000 * 60));
      if (diffMinutes < 1) {
        return '<1m';
      }
      return `${diffMinutes}m`;
    }

    if (diffH > 24) {
      return `${Math.round(diffH/24)}d`;
    }
  
    return `${diffH}h`;
  };


  const renderNotification = ({ item }) => (
    <Animatable.View animation="fadeIn" duration={500} style={[
      styles.notificationItem,
      item.status !== 'unread' && styles.notificationReadItem
    ]}>
      <View style={styles.tempContainer}>
        <Text style={styles.notificationTitle}>{item.title || 'No Title'}</Text>
        <Text style={styles.notificationDate}>
          {getTimeAgo(item.created_at)}
        </Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <ActionsContainer
        rightButtons={[
          ...(item.status === 'unread' ? [
            <MyButton 
              title="Mark as read" 
              backgroundColor="#4BA3C3" 
              borderColor="#4BA3C3"
              onPress={() => handleUpdateStatus(item.notification_id, 'read')}
            />
          ] : []),
          <MyButton 
            title="Archive" 
            backgroundColor="#175676" 
            borderColor="#175676"
            onPress={() => handleUpdateStatus(item.notification_id, 'archived')}
          />
        ]}
      />
    </Animatable.View>
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

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
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 10,
    backgroundColor: '#CCE6F4',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 2,
  },
  notificationReadItem: {
    backgroundColor: '#EDF9FF'
  },
  notificationTitle: {
    // fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationDate: {
    // fontSize: 18,
    color: '123123',
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
