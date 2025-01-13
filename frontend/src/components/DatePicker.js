import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/GlobalStyles';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      const formattedDate = formatDate(date);
      onDateChange(formattedDate);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableOpacity
      style={[globalStyles.pickerContainer, { width: '85%' }]}
      onPress={() => setShowPicker(true)}
    >
      <Text style={globalStyles.pickerValue}>{selectedDate || 'DD/MM/YYYY'}</Text>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default" // or "spinner"
          value={selectedDate ? new Date(selectedDate.split('/').reverse().join('-')) : new Date()}
          onChange={handleDateChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default DatePicker;

