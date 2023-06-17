import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import Tweet from '../components/Tweet1';
import { getThread } from '../services/thread';

const ThreadScreen = ({ route }) => {
  const { tweetId } = route.params;
  const [tweet, setTweet] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchThread = async () => {
      const { mainTweet, threadReplies } = await getThread(tweetId);
      setTweet(mainTweet);
      setReplies(threadReplies);
    };

    fetchThread();  
  }, [tweetId]);

  return (
    <View>
      {tweet && <Tweet tweet={tweet} />}
      <FlatList
        data={replies}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ThreadScreen;