import * as React from "react";
import { Image, StyleSheet, View,FlatList, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import CommentTweet from "./CommentTweet";

const TweetReplies = ({replies}) => {
  return (
    <View style={styles.listviewdiscussions}>
      <FlatList
        data={replies}
        renderItem={({ item }) => <CommentTweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  alainTypo: {
    textAlign: "left",
    color: Color.white,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  alinoTypo: {
    color: Color.grey,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  
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

export default TweetReplies;
