import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View , TextInput} from 'react-native'
import { auth, firestore } from '../services/firebaseConfig'
import { getBio, fetchPlugin, setDataTest } from '../services/bio'
import { doc, getDoc } from 'firebase/firestore'
const HomeScreen = () => {
  const navigation = useNavigation()
  const [bio, setBio] = useState("");
  const userId = auth.currentUser?.uid
  const [content, setContent] = useState("");

  const handleSubmitContent = () => {
    setDataTest(content)
  }

  useEffect(() => {

    if(auth.currentUser) {
        fetchPlugin(auth.currentUser.uid).then(data => setBio(data));
      }
      

},[auth.currentUser])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>UserId: {auth.currentUser?.uid}</Text>
      <Text>Bio: {bio}</Text>
      <TextInput
          placeholder="content"
          value={content}
          onChangeText={text => setContent(text)}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmitContent}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>


      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})