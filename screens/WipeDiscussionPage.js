import { Pressable, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import DiscussionContainer from "../components/TweetDetails";
import TweetReplies from "../components/TweetReplies";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Tweet from '../components/Tweet1';
import { getThread } from '../services/thread';
import TweetDetails from "../components/TweetDetails";
import { addComment } from '../services/tweets';


const WipeDiscussionPage = ({ route }) => {
  const navigation = useNavigation();
  const { tweetId } = route.params;
  const [tweet, setTweet] = useState(null);
  const [replies, setReplies] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async () => {
    const comment = {
      content: commentText,
      authorId: userId, // Make sure you have access to the current user's ID
      createdAt: new Date(),
    };

    await addComment(tweetId, comment);
    navigation.goBack();
  };
  
  useEffect(() => {
    const fetchThread = async () => {
      const { mainTweet, threadReplies } = await getThread(tweetId);
      setTweet(mainTweet);
      setReplies(threadReplies);
    };

    fetchThread();
  }, [tweetId]);

  return (

    <View style={styles.wipeDiscussionPage}>
      

      {tweet && <TweetDetails tweet={tweet} />}
      <TweetReplies replies={replies} />
      
 

    </View>
   
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  plusIcon: {
    fontSize: 30,
    color: '#fff',
  },
  discussion1Typo: {
    textAlign: "left",
    letterSpacing: 0,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  iconchevron: {
    width: 24,
    height: 24,
  },
  discussion1: {
    fontSize: FontSize.size_xl,
    color: Color.white,
    width: 109,
  },
  discussion: {
    marginLeft: 3,
  },
  iconchevronParent: {
    alignItems: "flex-end",
    marginTop: 26,
    flexDirection: "row",
  },
  envoyezVotreRponse: {
    fontSize: FontSize.size_xs,
    color: Color.grey,
  },
  reponseinput: {
    borderRadius: Border.br_31xl,
    backgroundColor: 'rgba(123, 104, 238, 0.5)', // replace with your preferred clear purple color
    paddingHorizontal: 46,
    paddingVertical: Padding.p_9xs,
    flexDirection: "row",
    width: '80%', // adjust as needed
    alignSelf: 'center', // center the input field
  },
  reponseinputWrapper: {
    position: 'absolute', // make the position absolute
    bottom: 20, // keep it at the bottom
    left: 0, // start from left
    right: 0, // end at right
    alignItems: 'center', // center the content
  },
  wipeDiscussionPage: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    paddingLeft: Padding.p_2xs,
    width: "100%",
  },
});

export default WipeDiscussionPage;
