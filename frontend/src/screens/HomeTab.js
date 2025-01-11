import React, { useContext } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'

import Header from '../components/Header';

const HomeTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <Text style={styles.title}>Home Tab</Text>
      <Text style={styles.desc}>TBA</Text>
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
  }
});

export default HomeTab;
