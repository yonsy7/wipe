import React, { useState, useCallback, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";
import { View, TextInput, Text, Alert, Pressable, Button} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { debounce } from 'lodash';


import SystemContainer from '../components/SystemContainer';
import DateInput from '../components/DateInput';
import { KeyboardAvoidingView } from 'react-native';

const WipeSignUp = () => {
  const navigation = useNavigation();
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showMode = () => {
    setShow(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])


  useEffect(() => {
    register('username', { required: 'Username is required', validate: () => usernameAvailable || 'Username is already taken' });
  }, [register]);

  const checkUsernameAvailability = async (username) => {
    setValue('username', username);
    const querySnapshot = await firestore.collection('users').where('username', '==', username).get();
    setUsernameAvailable(querySnapshot.empty);
  };

  const debouncedCheckUsernameAvailability = useCallback(
    debounce(checkUsernameAvailability, 2000),
    []
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthday(date);
    hideDatePicker();
  };

  const onSubmit = async (data) => {
    if (!username || !firstName || !lastName || !password || !confirmPassword || !email) {
      Alert.alert("Missing fields", "Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Password and confirm password do not match.");
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user;
      
      if (user) {
        const account_creation_date = Timestamp.now(); // Firestore timestamp
        const docRef = doc(firestore, "users", user.uid)
        const userDoc = {
            email : email,
            username: username,
            firstName,
            lastName,
            birthday, 
            bio: '', 
            circles: [], 
            account_creation_date
        }
        await setDoc(docRef, userDoc)
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior=""
    >
      <Text style={styles.title}>Create your account</Text>

      {errors?.username && <Text style={styles.errorText}>{errors?.username.message}</Text>}
      <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
            style={{ ...styles.input, flex: 1, marginRight: 10 }}
            placeholder='First Name'
            value={firstName}
            onChangeText={setFirstName}
        />
        <TextInput
            style={{ ...styles.input, flex: 1 }}
            placeholder='Last Name'
            value={lastName}
            onChangeText={setLastName}
        />
        </View>

      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={text => {
          setUsername(text);
          debouncedCheckUsernameAvailability(text);
        }}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      </View>

      
      

      <View style={styles.buttonContainer}>
      
      <TouchableOpacity
         style={[styles.button, styles.buttonOutline]}
        onPress={onSubmit}
      >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
})

export default WipeSignUp;
