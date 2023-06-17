
import {
    Pressable,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { FontSize, Color, FontFamily, Padding } from "../GlobalStyles";
  import React, { useState } from "react";
  
const CommentTweet = ({tweet}) => {

    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);
    
     const navigateToThread = () => {
        navigation.navigate('WipeDiscussionPage', { tweetId: tweet.id });
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
        <View style={styles.itemreponsediscussion}>
        <View style={styles.ellipseParent}>
          <Image
            style={styles.frameChild}
            resizeMode="cover"
            source={require("../assets/ellipse-9.png")}
          />
          <Image
            style={styles.frameItem}
            resizeMode="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={styles.frameParent}>
          <View style={styles.frameGroup}>
            <View style={styles.alainParent}>
              <Text style={[styles.alain, styles.alainTypo]}>{tweet.authorName}</Text>
              <Text style={[styles.alino, styles.alinoTypo]}></Text>
            </View>
            <Text style={[styles.enRponse, styles.alinoTypo]}>
              En réponse à {tweet.authorName}
            </Text>
            <Text
              style={[styles.cestSeulementMaintenant, styles.alainTypo]}
            >{tweet.content}</Text>
          </View>
          <View style={styles.frameContainer}>
            <View style={[styles.wrapper, styles.wrapperPosition]}>
              <Text style={styles.text}>{tweet.commentsCount}</Text>
            </View>
            <TouchableOpacity
            onPress={handleComment}>
            <Image
              style={styles.subtractIcon}
              resizeMode="cover"
              source={require("../assets/subtract1.png")}
            />
            </TouchableOpacity>
            <View style={[styles.container, styles.wrapperPosition]}>
              <Text style={styles.text}>{tweet.likesCount}</Text>
            </View>
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source={require("../assets/vector1.png")}
            />
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    alainTypo: {
      textAlign: "left",
      color: Color.white,
      fontFamily: FontFamily.abelRegular,
      letterSpacing: 0,
      fontSize: FontSize.size_sm,
      left: 0,
      position: "absolute",
    },
    alinoTypo: {
      color: Color.grey,
      fontSize: FontSize.size_xs,
      textAlign: "left",
      fontFamily: FontFamily.abelRegular,
      letterSpacing: 0,
      position: "absolute",
    },
    wrapperPosition: {
      width: 21,
      top: 0,
      position: "absolute",
      flexDirection: "row",
    },
    frameChild: {
      width: 44,
      height: 45,
    },
    frameItem: {
      width: 1,
      height: 72,
      marginTop: 8,
    },
    ellipseParent: {
      alignItems: "center",
    },
    alain: {
      width: 72,
      top: 0,
    },
    alino: {
      top: 2,
      left: 36,
      width: 67,
      height: 14,
    },
    alainParent: {
      width: 103,
      height: 18,
      left: 0,
      top: 0,
      position: "absolute",
    },
    enRponse: {
      top: 23,
      width: 136,
      height: 13,
      left: 0,
    },
    cestSeulementMaintenant: {
      top: 43,
      width: 244,
    },
    frameGroup: {
      height: 79,
      width: 244,
    },
    text: {
      width: 239,
      height: 14,
      fontSize: FontSize.size_xs,
      textAlign: "left",
      color: Color.white,
      fontFamily: FontFamily.abelRegular,
      letterSpacing: 0,
    },
    wrapper: {
      left: 0,
    },
    subtractIcon: {
      width: 11,
      height: 11,
    },
    container: {
      left: 56,
    },
    vectorIcon: {
      height: "75.17%",
      width: "15.27%",
      top: "15.99%",
      right: "-0.93%",
      bottom: "8.84%",
      left: "85.66%",
      maxWidth: "100%",
      overflow: "hidden",
      maxHeight: "100%",
      position: "absolute",
    },
    frameContainer: {
      width: 82,
      marginTop: 28,
      height: 14,
    },
    frameParent: {
      marginLeft: 13,
    },
    itemreponsediscussion: {
      flexDirection: "row",
    },
    listviewdiscussions: {
      height: 412,
      marginTop: 26,
    },
  });


export default CommentTweet