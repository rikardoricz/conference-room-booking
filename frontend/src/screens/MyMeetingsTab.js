import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View } from 'react-native';

const MyMeetingsTab = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Fetch meetings from API
    setMeetings([ /* Example meetings data */ ]);
  }, []);

  const renderMeeting = ({ item }) => (
    <View style={styles.meetingItem}>
      <Text>{item.name}</Text>
      <Text>{item.time}</Text>
      <Text>{item.location}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Lista spotkań */}
      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMeeting}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  meetingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MyMeetingsTab;
