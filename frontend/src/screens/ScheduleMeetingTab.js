import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button } from 'react-native';

import Calendar from '../components/Calendar';
import TimePicker from '../components/TimePicker';
import NumberPicker from '../components/NumberPicker';
import EquipmentItem from '../components/EquipmentItem';
import MyButton from '../components/MyButton';

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
  const [time, setTime] = useState('10:00');
  const [participants, setParticipants] = useState(10);
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
    setTime('10:00');
    setParticipants(10);
    setEquipment({
      projector: false,
      whiteboard: false,
    });
  };


  const handleScheduleMeeting = () => {
    // Logika planowania spotkania
    console.log(`Meeting scheduled on ${date} at ${time}, participants: ${participants}, projector ${equipment.projector}, whiteboard ${equipment.whiteboard}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionWrapper title="">
      {/* calendar */}
      <Calendar onSelectDate={(date) => setDate(date)} selected={date} />
      </SectionWrapper>

      <SectionWrapper title="Time">
        <TimePicker selectedTime={time} onTimeChange={setTime} />
      </SectionWrapper>

      <SectionWrapper title="Number of participants">
        <NumberPicker
          value={participants}
          onValueChange={setParticipants}
          minValue={1}
          maxValue={30}
        /> 
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
    // paddingHorizontal: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ScheduleMeetingTab;
