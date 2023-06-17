import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

const NotifContainer = ({notification}) => {
  const navigation = useNavigation();

  const handleNotificationPress = (notification) => {
    switch (notification.type) {
      case 'post':
        navigation.navigate('WipeDiscussionPage', { tweetId: notification.postId });
        break;
      case 'friendRequest':
      navigation.navigate('UserProfile', { userId: notification.userId, isFriendRequest: true });
      break;
      // Add other notification types and corresponding navigation here
      default:
        console.log('Unhandled notification type:', notification.type);
        break;
    }
  };

  return (
    <View style={styles.notifitem}>
      <View style={styles.notifitemWrapper}>
        <Image
          style={styles.notifitemIcon}
          resizeMode="cover"
          source={require("../assets/notifitem.png")}
        />
      </View>
      <View style={styles.notifsinfo}>
        <Image
          style={styles.notifsinfoChild}
          resizeMode="cover"
          source={require("../assets/ellipse-121.png")}
        />
        <View style={styles.amisaaim}>
          <Text style={[styles.aAimVotre, styles.matthieuTypo]}>
           {notification.title}
          </Text>
        </View>
        <Pressable
          style={styles.jeViensDeContainer}
          onPress={() => navigation.navigate("WipeDiscussionPage")}
        >
          <Text
            style={[styles.jeViensDeDcouvrirCeSuper, styles.matthieuTypo]}
          >{notification.description}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matthieuTypo: {
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
  },
  notifitemIcon: {
    width: 12,
    height: 11,
  },
  notifitemWrapper: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  notifsinfoChild: {
    width: 34,
    height: 37,
  },
  matthieu: {
    left: 0,
    width: 72,
    color: Color.white,
    top: 0,
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    height: 13,
  },
  aAimVotre: {
    left: 61,
    width: 157,
    color: Color.white,
    top: 0,
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    height: 13,
  },
  amisaaim: {
    width: 218,
    marginTop: 8,
    height: 13,
  },
  jeViensDeDcouvrirCeSuper: {
    color: Color.lightgray,
    width: 279,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
  },
  jeViensDeContainer: {
    marginTop: 8,
  },
  notifsinfo: {
    marginLeft: 10,
  },
  notifitem: {
    borderStyle: "solid",
    borderColor: "#464441",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_2xs,
    alignSelf: "stretch",
  },
});

export default NotifContainer;
