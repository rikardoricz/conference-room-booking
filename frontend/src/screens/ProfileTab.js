import React, { useContext, useEffect, useState } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native'

import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext'
import { authStyles } from '../styles/AuthStyles.js'

const ProfileTab = () => {
  const { logout, userToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:5000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error.message);
      Alert.alert('Error', 'Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : profile ? (
        <>
          <Text style={styles.title}>Welcome, {profile.username}!</Text>
          <Text style={styles.desc}>Email: {profile.email}</Text>
          <Text style={styles.desc}>Role: {profile.role}</Text>
        </>
      ) : (
        <Text style={styles.error}>Could not load profile data.</Text>
      )}
      <TouchableOpacity style={authStyles.primaryButton} onPress={logout}>
        <Text style={authStyles.primaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileTab;
