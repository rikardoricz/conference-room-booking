import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ 
  title, 
  onPress, 
  backgroundColor = '#175676', 
  textColor = '#FFFFFF',
  disabled = false,
  fontSize = 12,
  borderRadius = 10,
  borderColor = '#175676',
  height = 30
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, height, borderColor, borderRadius },
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 30,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Lato_700Bold',
  },
  disabled: {
    opacity: 0.5,
  }
});

export default MyButton;

