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

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <Text style={authStyles.title}>Login</Text>
      <View>
        <TextInput
          style={authStyles.input}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={authStyles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={authStyles.primaryButton} onPress={handleLogin}>
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
