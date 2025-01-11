import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';

const NumberInput = ({ value, onValueChange, minValue = 1, maxValue = 30 }) => {
  const handleInputChange = (text) => {
    const numericValue = parseInt(text, '');

    if (text === '') {
      onValueChange('');
    } else if (!isNaN(numericValue) && numericValue >= minValue && numericValue <= maxValue) {
      onValueChange(numericValue);
    }
  };

  return (
    <View style={[globalStyles.pickerContainer, { width: 100 }]}>
      <TextInput
        style={globalStyles.pickerValue}
        value={value?.toString() || ''}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder={`${minValue}-${maxValue}`}
        maxLength={2} // limit to 2 digits
      />
    </View>
  );
};

export default NumberInput;

