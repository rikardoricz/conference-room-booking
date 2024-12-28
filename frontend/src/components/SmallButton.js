import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SmallButton = ({ 
  title, 
  onPress, 
  backgroundColor = '#175676', 
  textColor = '#FFFFFF',
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Medium',
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  }
});

export default SmallButton;

