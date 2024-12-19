import React, { useContext } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native'

import Tabs from '../navigation/Tabs'

const HomeScreen = ({navigation}) => {
  return <Tabs />
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

export default HomeScreen;
