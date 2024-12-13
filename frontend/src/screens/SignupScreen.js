import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Username'
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('User')} 
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>Login</Text>
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
    backgroundColor: '#fff'
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
  loginContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    color: 'black',
    marginRight: 5, 
  },
  loginLinkText: {
    color: '#007bff',
    fontWeight: 'bold',
  }
});

export default SignupScreen;
