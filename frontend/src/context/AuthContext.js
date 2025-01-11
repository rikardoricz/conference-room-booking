import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
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
        await SecureStore.setItemAsync('refreshToken', data.refresh_token);
        setUserToken(data.access_token);
        setRefreshToken(data.refresh_token);

        const decodedAccessToken = jwtDecode(data.access_token);
        scheduleTokenRefresh(data.refresh_token, decodedAccessToken.exp * 1000);
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
      Alert.alert('Error', 'Network error. please try again.');
    }

  }
  
  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setUserToken(null);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!storedRefreshToken) {
        console.log('No refresh token found');
        await logout();
        return;
        //throw new Error('No refresh token found');
      }

      const response = await fetch('http://10.0.2.2:5000/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedRefreshToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token refreshed:', data);
        await SecureStore.setItemAsync('userToken', data.access_token);
        setUserToken(data.access_token);

        const decodedAccessToken = jwtDecode(data.access_token);
        scheduleTokenRefresh(storedRefreshToken, decodedAccessToken.exp * 1000);
      } else {
        console.error('Failed to refresh token:', data);
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh error:', error.message);
      console.log('Logging out')
      logout(); // logout user if refresh fails
    }
  };

  const scheduleTokenRefresh = (refreshToken, expiry) => {
    const currentTime = Date.now();
    const timeout = expiry - currentTime - 30000; // refresh 30 seconds before expiry

    if (timeout > 0) {
      setTimeout(() => {
        refreshAccessToken(refreshToken);
      }, timeout);
    }
  };

  const isLoggedIn = async () => {
    try {
      const storedAccessToken = await SecureStore.getItemAsync('userToken');
      const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');

      if (storedAccessToken && storedRefreshToken) {
        const decoded = jwtDecode(storedAccessToken);
        const expiry = decoded.exp * 1000;

        if (Date.now() < expiry) {
          // token still valid
          setUserToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          scheduleTokenRefresh(storedRefreshToken, expiry);
        } else {
          // token expired, try to refresh
          await refreshAccessToken();
        }
      }
    } catch (error) {
      console.error('Error checking login status:', error.message);
      logout();
    } finally {
      setLoading(false);
    }
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

