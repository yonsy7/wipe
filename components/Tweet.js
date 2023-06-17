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

const Tweet = ({tweet}) => {
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
    <TouchableOpacity
      style={styles.itemtweet}
      activeOpacity={0.2}
      onPress={() => navigation.navigate("WipeDiscussionPage", { tweetId: tweet.id })}
    >
      <View style={styles.tweetsection}>
        <Image
          style={styles.photodeprofilIcon}
          resizeMode="cover"
          source={require("../assets/photodeprofil.png")}
        />
        <View style={styles.tweetinfo}>
          <View style={[styles.pseudotimeleft, styles.philPosition]}>
            <Text style={[styles.phil, styles.philTypo]}>{tweet.authorName}</Text>
            <Text style={[styles.h49minRestantes, styles.textLayout]}>
              • {timeRemaining(tweet.createdAt)}
            </Text>
          </View>
          <Pressable
            style={[styles.jeViensDeContainer, styles.philPosition]}
          >
            <Text
              style={[styles.jeViensDeDcouvrirCeSuper, styles.philTypo]}
            >{tweet.content}</Text>
          </Pressable>

          <View style={styles.frameParent}>
            <Pressable 
            onPress={() =>   navigation.navigate('ComposeComment', { tweetId: tweet.id, tweet: tweet })  }>
            <View style={[styles.wrapper, styles.wrapperPosition]}>
              <Text style={[styles.text, styles.textLayout]}>{tweet.commentsCount}</Text>
            </View>
            </Pressable>
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source={require("../assets/vector3.png")}
            />
            <View style={[styles.container, styles.wrapperPosition]}>
              <Text style={[styles.text, styles.textLayout]}>{tweet.likesCount}</Text>
            </View>
            <Image
              style={styles.subtractIcon}
              resizeMode="cover"
              source={require("../assets/subtract2.png")}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  philPosition: {
    left: 0,
    position: "absolute",
  },
  philTypo: {
    textAlign: "left",
    fontSize: FontSize.size_sm,
    color: Color.white,
  },
  textLayout: {
    width: 239,
    height: 14,
    letterSpacing: 0,
  },
  wrapperPosition: {
    width: 11,
    top: 0,
    position: "absolute",
    flexDirection: "row",
  },
  photodeprofilIcon: {
    width: 50,
    height: 51,
  },
  phil: {
    width: 72,
  },
  h49minRestantes: {
    fontSize: FontSize.size_xs,
    color: Color.grey,
    height: 14,
    width: 239,
    textAlign: "right",
  },
  pseudotimeleftPosition: {
    left: 0,
    position: "absolute",
  },
  pseudotimeleft: {
    width: 267,
    height: 18,
    top: 0,
    left: 0,
    flexDirection: "row",
  },
  jeViensDeDcouvrirCeSuper: {
    width: 279,
  },
  jeViensDeContainer: {
    top: 19,
  },
  text: {
    fontSize: FontSize.caption10SemiBold_size,
    fontWeight: "600",
    height: 14,
    color: Color.white,
    width: 239,
  },
  wrapper: {
    left: 21,
  },
  vectorIcon: {
    height: "89.46%",
    width: "5.22%",
    top: "1.7%",
    right: "7.81%",
    bottom: "8.84%",
    left: "86.96%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  container: {
    left: 248,
  },
  subtractIcon: {
    width: 13,
    height: 13,
  },
  frameParent: {
    top: 68,
    left: 1,
    width: 259,
    height: 14,
    position: "absolute",
  },
  tweetinfo: {
    height: 82,
    marginLeft: 10,
    width: 279,
  },
  tweetsection: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  itemtweet: {
    
    borderTopColor: "#626262",
    borderBottomColor: "#626262",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.4,
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: Padding.p_3xl,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  }
  
});

export default Tweet;
