import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button } from 'react-native';

import TimePicker from '../components/TimePicker';
import NumberInput from '../components/NumberInput';
import EquipmentItem from '../components/EquipmentItem';
import MyButton from '../components/MyButton';
import DatePicker from '../components/DatePicker';

const SectionWrapper = ({ title, children }) => {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null} 
      {children}
    </View>
  );
};

const ScheduleMeetingTab = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [participants, setParticipants] = useState('');
  const [equipment, setEquipment] = useState({
    projector: false,
    whiteboard: false,
  });

  const toggleEquipment = (item) => {
    setEquipment((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const clearFilters = () => {
    setDate('');
    setStartTime('10:00');
    setEndTime('11:00');
    setParticipants('');
    setEquipment({
      projector: false,
      whiteboard: false,
    });
  };


  const handleScheduleMeeting = () => {

    console.log(`Meeting scheduled on ${date} from ${startTime} to ${endTime}, participants: ${participants}, projector ${equipment.projector}, whiteboard ${equipment.whiteboard}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionWrapper title="Date">
        <View style={styles.wrapperCenter}>
          <DatePicker
            selectedDate={date}
            onDateChange={(newDate) => setDate(newDate)}
          />
        </View>
      </SectionWrapper>

      <SectionWrapper title="Time">
        <View style={styles.timePickerRow}>
          <Text style={styles.timePickerLabel}>from</Text>
          <TimePicker selectedTime={startTime} onTimeChange={setStartTime} />
          <Text style={styles.timePickerLabel}>to</Text>
          <TimePicker selectedTime={endTime} onTimeChange={setEndTime} />
        </View>
      </SectionWrapper>

      <SectionWrapper title="Number of participants">
        <View style={styles.wrapperCenter}>
        <NumberInput
          value={participants}
          onValueChange={setParticipants}
          minValue={1}
          maxValue={30}
        /> 
        </View>
      </SectionWrapper>

      <SectionWrapper title="Equipment">
        <View style={styles.eq}>
          <EquipmentItem
            iconName="videocam-outline"
            text="Projector"
            isSelected={equipment.projector}
            onToggle={() => toggleEquipment('projector')}
          />
          <EquipmentItem
            iconName="easel-outline"
            text="Whiteboard"
            isSelected={equipment.whiteboard}
            onToggle={() => toggleEquipment('whiteboard')}
          />
        </View>
      </SectionWrapper>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <MyButton 
            title="Clear all" 
            backgroundColor="#fff" 
            height={52}
            fontSize={20}
            borderRadius={15}
            textColor="#175676"
            onPress={clearFilters}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <MyButton 
            title="Search" 
            backgroundColor="#175676" 
            height={52}
            fontSize={20}
            borderRadius={15}
            onPress={handleScheduleMeeting}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Lato_700Bold',
    marginBottom: 12,
    color: '#1E1E1E',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  timePickerRow: {
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  timePickerLabel: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 8,
  },
  wrapperCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduleMeetingTab;
