import React, { useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MeetingsTab from '../screens/MeetingsTab';
import ReservationsTab from '../screens/ReservationsTab';
import NotificationsTab from '../screens/NotificationsTab';
import ProfileTab from '../screens/ProfileTab';
import AdministrationTab from '../screens/AdministrationTab';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { isAdmin } = useContext(AuthContext);
  console.log(isAdmin);
  return (
    <Tab.Navigator
      initialRouteName={isAdmin ? "Administration" : "Reservations"} 
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarActiveTintColor: '#4BA3C3',
        tabBarInactiveTintColor: '#9C9C9C',
      }}
    >
      {isAdmin ? (
        <>
        <Tab.Screen
          name="Administration"
          component={AdministrationTab}
          options={{ 
            title: 'Administration' ,
            tabBarIcon:({size, color})=>(
              <Icon name="cog" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ 
            title: 'Profile' ,
            tabBarIcon:({size, color})=>(
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
        </>
      ) : (
      <>

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
      </>
      )}
    </Tab.Navigator>
  );
};

export default Tabs;

