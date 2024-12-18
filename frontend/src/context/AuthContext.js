import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/login', { // 10.0.2.2 is a special alias for the host machine from the emulator
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        await SecureStore.setItemAsync('userToken', data.access_token);
        setUserToken(data.access_token);
      } else {
        console.log('Login failed:', data);
        Alert.alert('Error', data.message || 'Login failed');
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('error', 'network error. please try again.');
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        Alert.alert('Success', 'Account created successfully!');
        // optionally login immediately after signup
        //login(username, password);
      } else {
        console.log('Signup failed:', data);
        Alert.alert('Error', data.message || 'Signup failed');
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error.message);
      Alert.alert('error', 'network error. please try again.');
    }

  }
  
  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  };

  const isLoggedIn = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    setUserToken(token);
    setLoading(false);
  };

  useEffect(() => {
    isLoggedIn(); // check token on app start
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

