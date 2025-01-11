import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const AppHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, 
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
    color: '#000',
  },
});

export default AppHeader;
