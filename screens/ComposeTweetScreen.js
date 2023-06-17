// src/screens/ComposeTweetScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCircles } from '../services/circles';
import { createTweet } from '../services/tweets';



const ComposeTweetScreen = () => {
  const [tweetText, setTweetText] = useState('');
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCircles = async () => {
      const circlesData = await getCircles();
      setCircles(circlesData);
    };

    fetchCircles();
  }, []);

  const handleCircleSelection = (circleId) => {
    if (selectedCircles.includes(circleId)) {
      setSelectedCircles(selectedCircles.filter((id) => id !== circleId));
    } else {
      setSelectedCircles([...selectedCircles, circleId]);
    }
  };

  const handlePublish = async () => {
    if (tweetText.trim() === '') {
      Alert.alert('Error', 'Tweet cannot be empty');
      return;
    }

    await createTweet(tweetText, selectedCircles);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Compose Tweet</Text>
      <TextInput
        value={tweetText}
        onChangeText={setTweetText}
        placeholder="What's happening?"
      />

      <FlatList
        data={circles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCircleSelection(item.id)}>
            <Text style={selectedCircles.includes(item.id) ? { fontWeight: 'bold' } : {}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={handlePublish}>
        <Text>Publish</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComposeTweetScreen;