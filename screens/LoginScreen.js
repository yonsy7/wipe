import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signIn } from '../services/authentication';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Erreur de connexion', error.message);
    }
  };

  return (
    <View>
      <Text>Connexion</Text>
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
      <Button title="Se connecter" onPress={handleSignIn} />
      <Button title="S'inscrire" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;