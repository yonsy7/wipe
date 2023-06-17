// src/screens/ComposeCommentScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createComment } from '../services/tweets';
import { auth } from '../services/firebaseConfig';
import TweetDetails from '../components/TweetDetails';

const ComposeCommentScreen = () => {
  const route = useRoute();
  const { tweetId, tweet } = route.params; // get the tweet from the navigation parameters
  const [commentText, setCommentText] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const userId = auth.currentUser.uid
    await createComment(tweetId, commentText);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TweetDetails tweet={tweet} />
    
      <TextInput
        value={commentText}
        onChangeText={setCommentText}
        placeholder="Write your comment..."
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1B103A',
  },
  title: {
    fontSize: 20,
  
    marginBottom: 10,
    color:'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    
    color:"white",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    color:'#000',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ComposeCommentScreen;
