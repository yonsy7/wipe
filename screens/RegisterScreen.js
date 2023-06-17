import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signUp } from '../services/authentication';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erreur d\'inscription', error.message);
    }
  };

  return (
    <View>
      <Text>Inscription</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCompleteType="email"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="S'inscrire" onPress={handleSignUp} />
      <Button title="Se connecter" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;