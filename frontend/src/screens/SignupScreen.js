import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { authStyles } from '../styles/AuthStyles.js'

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>Signup Screen</Text>
      <View>
        <TextInput
          style={authStyles.input}
          placeholder='Username'
        />
        <TextInput
          style={authStyles.input}
          placeholder='Email'
        />
        <TextInput
          style={authStyles.input}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity
          style={authStyles.primaryButton}
          onPress={() => navigation.navigate('User')} 
        >
          <Text style={authStyles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={authStyles.signupContainer}>
          <Text style={authStyles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={authStyles.signupLinkText}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
