import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFeedTweets } from '../services/tweets';

const HomeScreen = ({ userId }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      
        const feedTweets = await getFeedTweets(userId);
        setTweets(feedTweets);
    };

    fetchTweets();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.content}</Text>
      <Text>{item.createdAt.toDate().toString()}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;