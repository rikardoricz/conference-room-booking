import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

import { AuthContext } from '../context/AuthContext'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AvailableRoomsScreen from '../screens/AvailableRoomsScreen';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';
import ReservationDetailsScreen from '../screens/ReservationDetailsScreen';

import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Lato_300Light, Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, loading, isAdmin } = useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
  });


  if (loading || !fontsLoaded) {
    // loading indicator while checking login status and loading fonts
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        {userToken ? (
          // screens after login
          <>
            {isAdmin ? (
            // admin screens
              <>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AvailableRooms" component={AvailableRoomsScreen} />
                <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
                <Stack.Screen name="ReservationDetailsScreen" component={ReservationDetailsScreen} />
              </>
            )}
          </>
        ) : (
          // screens before login
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
