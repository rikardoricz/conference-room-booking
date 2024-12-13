import React from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { authStyles } from '../styles/AuthStyles.js'

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>Login Screen</Text>
      <View>
        <TextInput
          style={authStyles.input}
          placeholder='Username'
        />
        <TextInput
          style={authStyles.input}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity style={authStyles.primaryButton}>
          <Text style={authStyles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={authStyles.signupContainer}>
          <Text style={authStyles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={authStyles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
