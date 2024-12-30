import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/GlobalStyles';

const TimePicker = ({ selectedTime, onTimeChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      const formattedTime = formatTime(date);
      onTimeChange(formattedTime);
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      style={globalStyles.pickerContainer}
      onPress={() => setShowPicker(true)}
    >
      <Text style={globalStyles.pickerValue}>{selectedTime || '__ : __'}</Text>
      {showPicker && (
        <DateTimePicker
          mode="time"
          display="default" // or spinner
          value={selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : new Date()}
          onChange={handleTimeChange}
        />
      )}
    </TouchableOpacity>
  );
};

export default TimePicker;
