import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';

const InputField = ({ 
  value,
  onValueChange, 
  keyboardType = 'default', 
  minValue, 
  maxValue, 
  maxLength,
  placeholder
}) => {
  const handleInputChange = (text) => {
    if (keyboardType === 'numeric') {
      const numericValue = parseInt(text, 10); 

      if (text === '') {
        onValueChange('');
      } else if (!isNaN(numericValue) && 
                (minValue === undefined || numericValue >= minValue) && 
                (maxValue === undefined || numericValue <= maxValue)) {
        onValueChange(numericValue);
      }
    } else {
      onValueChange(text);
    }
  };

  return (
    <View style={[globalStyles.pickerContainer, { width: 100 }]}>
      <TextInput
        style={globalStyles.pickerValue}
        value={value?.toString() || ''}
        onChangeText={handleInputChange}
        keyboardType={keyboardType}
        maxLength={maxLength} 
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputField;

