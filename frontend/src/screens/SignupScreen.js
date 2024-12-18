import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
} from 'react-native';

import { AuthContext } from '../context/AuthContext'
import { authStyles } from '../styles/AuthStyles.js'

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = () => {
    signup(username, email, password);
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>Signup Screen</Text>
      <View>
        <TextInput
          style={authStyles.input}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={authStyles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={authStyles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={authStyles.input}
          placeholder='Confirm password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={authStyles.primaryButton} onPress={handleSignup}>
          <Text style={authStyles.primaryButtonText}>Sign up</Text>
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
