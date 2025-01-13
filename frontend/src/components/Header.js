import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ title, showMarkAllRead, onMarkAllRead }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {showMarkAllRead && (
          <TouchableOpacity 
            style={styles.markAllButton} 
            onPress={onMarkAllRead}
          >
            <Icon name="checkmark-done" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, 
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Lato_400Regular',
    color: '#000',
  },
  markAllButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
});

export default AppHeader;
