import React from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Username'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  signupContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    color: 'black',
    marginRight: 5, 
  },
  signupLinkText: {
    color: '#007bff',
    fontWeight: 'bold',
  }
})

export default LoginScreen;