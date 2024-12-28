import React from 'react';
import { View, StyleSheet } from 'react-native';

const ActionsContainer = ({ leftButton, rightButtons }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {leftButton}
      </View>
      <View style={styles.rightSection}>
        {rightButtons.map((button, index) => (
          <View key={index} style={[styles.rightButton, index === 0 && styles.firstRightButton]}>
            {button}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSection: {
    alignItems: 'flex-start',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  rightButton: {
    marginLeft: 8,
  },
  firstRightButton: {
    marginLeft: 8,
  },
});

export default ActionsContainer;
