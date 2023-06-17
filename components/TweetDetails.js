import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import React, { useState } from 'react';
import {TouchableOpacity } from 'react-native';
import { likeTweet, unlikeTweet, addComment } from '../services/tweets';


const TweetDetails = ({tweet}) => {
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
  navigation.navigate('ComposeComment', { tweetId: tweet.id, tweet: tweet });
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
    <View style={styles.discussioninfo}>
      <View style={[styles.ellipseParent, styles.parentFlexBox]}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/ellipse-81.png")}
        />
        <View style={styles.philParent}>
          <Text style={[styles.phil, styles.philTypo]}>{tweet.authorName}</Text>
        </View>
      </View>
      <Text
        style={[styles.jeViensDe, styles.philTypo]}
      >{tweet.content}</Text>
      <Text style={[styles.h49minRestantes, styles.textLayout]}>
      {timeRemaining(tweet.createdAt)}
      </Text>
      <View style={[styles.frameParent, styles.parentFlexBox]}>
        <View style={styles.wrapper}>
          <Text style={[styles.text, styles.textLayout]}>{tweet.commentsCount}</Text>
        </View>
        <Pressable
          style={[styles.subtract, styles.subtractLayout]}
          onPress={handleComment}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/subtract.png")}
          />
        </Pressable>
        <View style={styles.container}>
          <Text style={[styles.text1, styles.text1Typo]}>{tweet.likesCount}</Text>
        </View>
        <Image
          style={[styles.vectorIcon, styles.subtractLayout]}
          resizeMode="cover"
          source={require("../assets/vector.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  philTypo: {
    textAlign: "left",
    letterSpacing: 0,
    color: Color.white,
    fontSize: FontSize.size_sm,
  },
  text1Typo: {
    height: 14,
    textAlign: "left",
    letterSpacing: 0,
  },
  textLayout: {
    width: 239,
    height: 14,
    textAlign: "left",
    letterSpacing: 0,
  },
  subtractLayout: {
    height: 13,
    marginLeft: 11,
  },
  frameChild: {
    width: 44,
    height: 45,
  },
  phil: {
    top: 0,
    width: 55,
    left: 0,
    position: "absolute",
  },
  lephilou: {
    top: 19,
    color: Color.grey,
    fontSize: FontSize.size_xs,
    left: 0,
    position: "absolute",
    width: 67,
  },
  philParent: {
    height: 33,
    marginLeft: 13,
    width: 67,
  },
  ellipseParent: {
    flexDirection: "row",
  },
  jeViensDe: {
    width: 279,
    marginTop: 18,
  },
  h49minRestantes: {
    marginTop: 18,
    color: Color.grey,
    fontSize: FontSize.size_xs,
  },
  text: {
    color: Color.white,
    fontSize: FontSize.size_sm,
  },
  wrapper: {
    width: 21,
    flexDirection: "row",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  subtract: {
    width: 13,
    marginLeft: 11,
  },
  text1: {
    width: 21,
    color: Color.white,
    fontSize: FontSize.size_sm,
  },
  container: {
    marginLeft: 11,
    width: 21,
    flexDirection: "row",
  },
  vectorIcon: {
    width: 14,
    marginLeft: 11,
  },
  frameParent: {
    marginTop: 18,
    flexDirection: "row",
  },
  discussioninfo: {
    height: 179,
    marginTop: 26,
  },
});

export default TweetDetails;
