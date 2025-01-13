import { 
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';

const AdministrationTab = ({ navigation }) => {
return (
    <SafeAreaView style={styles.container}>
      <Header title="Administration" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default AdministrationTab;

