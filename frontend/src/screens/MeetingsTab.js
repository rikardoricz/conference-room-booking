import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyMeetingsTab from './MyMeetingsTab';
import ScheduleMeetingTab from './ScheduleMeetingTab';
import MyReservationsTab from './MyReservationsTab';

const Tab = createMaterialTopTabNavigator();

const MeetingsTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="MyMeetings"
        lazy={true}  // Zakładki ładują się tylko wtedy, gdy są potrzebne
        screenOptions={{
          tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
          tabBarIndicatorStyle: { backgroundColor: '#000' },
          tabBarStyle: { marginTop: 30 }, // Margines, aby przesunąć zakładki w dół
        }}
      >
        <Tab.Screen name="ScheduleMeeting" component={ScheduleMeetingTab} options={{ title: 'Schedule a meeting' }} />
        <Tab.Screen name="MyMeetings" component={MyMeetingsTab} options={{ title: 'My meetings' }} />
        <Tab.Screen name="MyReservations" component={MyReservationsTab} options={{ title: 'My reservations' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MeetingsTab;
