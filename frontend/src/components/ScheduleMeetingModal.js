import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Modal,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TimePicker from './TimePicker';
import InputField from './InputField';
import EquipmentItem from './EquipmentItem';
import MyButton from './MyButton';
import DatePicker from './DatePicker';

const SectionWrapper = ({ title, children }) => {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null} 
      {children}
    </View>
  );
};

const ScheduleMeetingModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
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

  const validateForm = () => {
    if (!date) {
      Alert.alert(
        "Missing Information",
        "Please select a date",
        [{ text: "OK" }]
      );
      return false;
    }
    if (!participants) {
      Alert.alert(
        "Missing Information",
        "Please enter number of participants",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };


  const handleSearchRooms = () => {
    if (!validateForm()) return;

    // go to AvailableRoomsScreen with the search parameters
    navigation.navigate('AvailableRooms', {
      date,
      startTime,
      endTime,
      participants,
      equipment,
    });
    onClose();
  };


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <SafeAreaView style={styles.container}>
                <Text style={styles.modalTitle}>Schedule a meeting</Text>
                
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
                    <InputField
                      value={participants}
                      onValueChange={setParticipants}
                      keyboardType="numeric" 
                      minValue={1}
                      maxValue={30}
                      placeholder="1-30"
                      style={{ width: '85%' }}
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
                      onPress={handleSearchRooms}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1E1E1E',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    marginTop: 'auto',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  timePickerRow: {
    //paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 8,
    marginHorizontal: 8,
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
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%', 
    maxWidth: 400,
  },
  eq: {
    marginHorizontal: 8,
  },
});

export default ScheduleMeetingModal;
