import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeTab from '../screens/HomeTab';
import RoomsTab from '../screens/RoomsTab';
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
        name="Rooms"
        component={RoomsTab}
        options={{ title: 'Rooms' ,
        tabBarIcon:({size, color})=>(
            <Icon name="location-sharp" size={size} color={color} />
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

