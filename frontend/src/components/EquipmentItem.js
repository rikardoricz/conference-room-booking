import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EquipmentItem = ({ iconName, text, isSelected, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onToggle}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
        <Icon
          name={iconName}
          size={32}
          color={isSelected ? '#fff' : '#4A5660'}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
      <Icon
        name={isSelected ? 'radio-button-on' : 'radio-button-off'}
        size={50}
        color='#4BA3C3'
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    /* backgroundColor: '#F8F9FB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, */
  },
  selectedContainer: {
    backgroundColor: '#E0F0FF',
  },
  iconContainer: {
    backgroundColor: '#CCE6F4',
    padding: 8,
    borderRadius: 50,
    marginRight: 12,
  },
  selectedIconContainer: {
    backgroundColor: '#4BA3C3',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  radioButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4BA3C3',
    backgroundColor: 'transparent',
  },
  selectedRadioButton: {
    backgroundColor: '#4BA3C3',
  },
});

export default EquipmentItem;

