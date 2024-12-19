import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeTab from '../screens/HomeTab';
import SettingsTab from '../screens/SettingsTab';
import RoomsTab from '../screens/RoomsTab';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
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
        name="Settings"
        component={SettingsTab}
        options={{ title: 'Settings' ,
        tabBarIcon:({size, color})=>(
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

