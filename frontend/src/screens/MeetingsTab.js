import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyMeetingsTab from './MyMeetingsTab';
import ScheduleMeetingTab from './ScheduleMeetingTab';
import MyReservationsTab from './MyReservationsTab';

const Tab = createMaterialTopTabNavigator();

const MeetingsTab = () => {
  const [activeTab, setActiveTab] = useState('My meetings');

  const handleTabChange = (route) => {
    // Zmiana tytułu w zależności od aktywnego taba
    if (route.name === 'MyMeetings') {
      setActiveTab('My Meetings');
    } else if (route.name === 'ScheduleMeeting') {
      setActiveTab('Schedule a Meeting');
    } else if (route.name === 'MyReservations') {
      setActiveTab('My Reservations');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Wyświetlanie tytułu powyżej zakładek */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{activeTab}</Text>
      </View>

      {/* Zakładki */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 17, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#000' },
        }}
        tabBarPosition="top"
        initialRouteName="MyMeetings"
        // Listener zmiany zakładek
        screenListeners={({ route }) => ({
          state: () => handleTabChange(route),
        })}
      >
        <Tab.Screen name="ScheduleMeeting" component={ScheduleMeetingTab} options={{ title: 'Schedule a Meeting' }} />
        <Tab.Screen name="MyMeetings" component={MyMeetingsTab} options={{ title: 'My Meetings' }} />
        <Tab.Screen name="MyReservations" component={MyReservationsTab} options={{ title: 'My Reservations' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingVertical: 5,
    backgroundColor: '#f5f5f5', // Dostosuj styl, aby odróżnić nagłówek
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,  // Dodanie marginesu górnego, aby przesunąć header w dół
  },
});
export default MeetingsTab;
