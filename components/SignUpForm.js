import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import firebase from './firebaseConfig';

const SignUpForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const { register, setValue, handleSubmit, errors } = useForm();

  useEffect(() => {
    register('username', { required: 'Username is required', validate: () => usernameAvailable || 'Username is already taken' });
  }, [register]);

  const checkUsernameAvailability = async (username) => {
    setValue('username', username);
    const querySnapshot = await firebase.firestore().collection('users').where('username', '==', username).get();
    setUsernameAvailable(querySnapshot.empty);
  };

  const onSubmit = (data) => {
    // Handle user registration with the provided data
    console.log('Form data:', data);
  };

  return (
    <View>
      <Text>Username</Text>
      <TextInput
        onChangeText={(text) => checkUsernameAvailability(text)}
        autoCapitalize="none"
      />
      {errors.username && <Text>{errors.username.message}</Text>}

      {/* Add other form fields like email, password, etc. */}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;