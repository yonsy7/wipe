import React, { useState } from 'react';
import { View, Text ,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { likeTweet, unlikeTweet, addComment } from '../services/tweets';

const Tweet = ({tweet}) => {
const navigation = useNavigation();
const [liked, setLiked] = useState(false);

 const navigateToThread = () => {
    navigation.navigate('Thread', { tweetId: tweet.id });
  };
const handleLike = async () => {
  await likeTweet(tweet.id, userId);
  setLiked(true);
};

const handleUnlike = async () => {
  await unlikeTweet(tweet.id, userId);
  setLiked(false);
};

const handleComment = () => {
  navigation.navigate('ComposeComment', { tweetId: tweet.id });
};

const timeRemaining = (createdAt) => {
const msIn24h = 86400000;
const now = new Date();
const createdAtDate = createdAt.toDate();
const timeElapsed = now - createdAtDate;
const timeLeft = msIn24h - timeElapsed;
if (timeLeft <= 0) {
  return 'Expired';
}

const hours = Math.floor(timeLeft / 3600000);
const minutes = Math.floor((timeLeft % 3600000) / 60000);

return `${hours}h ${minutes}m remaining`;
};

return (
<TouchableOpacity onPress={navigateToThread}>
      <View>
	<Text>{tweet.authorName}</Text>
  <Text>{tweet.content}</Text>
	<Text>{timeRemaining(tweet.createdAt)}</Text>
	<View>
          <Text>{tweet.commentsCount} Comments</Text>
          <Text>{tweet.likesCount} Likes</Text>
          <TouchableOpacity onPress={handleComment}>
            <Text>Comment</Text>
          </TouchableOpacity>
          {liked ? (
            <TouchableOpacity onPress={handleUnlike}>
              <Text>Unlike</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike}>
              <Text>Like</Text>
            </TouchableOpacity>
          )}
        </View>
	</View>
    </TouchableOpacity>
);
};

export default Tweet;
