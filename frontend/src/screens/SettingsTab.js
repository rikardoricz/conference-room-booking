import React, { useContext } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { AuthContext } from '../context/AuthContext'
import { authStyles } from '../styles/AuthStyles.js'

const SettingsTab = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text style={styles.desc}>TBA</Text>
      <TouchableOpacity style={authStyles.primaryButton} onPress={logout}>
        <Text style={authStyles.primaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  }
});

export default SettingsTab;
