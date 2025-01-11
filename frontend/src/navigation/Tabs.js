import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeTab from '../screens/HomeTab';
import MeetingsTab from '../screens/MeetingsTab';
import ReservationsTab from '../screens/ReservationsTab';
import NotificationsTab from '../screens/NotificationsTab';
import ProfileTab from '../screens/ProfileTab';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarActiveTintColor: '#4BA3C3',
        tabBarInactiveTintColor: '#9C9C9C',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ title: 'Home' ,
        tabBarIcon:({size, color})=>(
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationsTab}
        options={{ title: 'Reservations' ,
        tabBarIcon:({size, color})=>(
            <Icon name="checkmark-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meetings"
        component={MeetingsTab}
        options={{ title: 'Meetings' ,
        tabBarIcon:({size, color})=>(
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTab}
        options={{ title: 'Notifications' ,
        tabBarIcon:({size, color})=>(
            <Icon name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ title: 'Profile' ,
        tabBarIcon:({size, color})=>(
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

