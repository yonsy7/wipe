import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { getUserProfile, getUserTweets, deleteTweet} from '../services/users';
import { acceptFriendRequest } from '../services/friends';

const WipeProfilePage = ({ route }) => {
  const navigation = useNavigation();

  const { userId, isFriendRequest } = route.params;
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getUserProfile(userId);
      setProfile(fetchedProfile);
    };
    const fetchTweets = async () => {
      const fetchedTweets = await getUserTweets(userId);
      setTweets(fetchedTweets);
    };
    fetchProfile();
    fetchTweets();
    setLoading(false)
  }, [userId]);

  const handleAcceptFriendRequest = async () => {
    await acceptFriendRequest(userId);
    // Update the UI or navigate to another screen as needed
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
	const handleDeleteTweet = async (tweetId) => {
    await deleteTweet(userId, tweetId);
    const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetId);
    setTweets(updatedTweets);
  };


  return (
    <View style={styles.wipeProfilePage}>
      <SystemContainer
        timeAlignSelf="unset"
        timeWidth={375}
        timePosition="absolute"
        timeTop={0}
        timeLeft={1}
      />
      <View style={[styles.topback, styles.topbackSpaceBlock]}>
        <Pressable
          style={styles.iconchevron}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/iconchevron.png")}
          />
        </Pressable>
        <Pressable
          style={styles.profil}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Text style={styles.profil1}>Profil</Text>
        </Pressable>
      </View>
      <View style={[styles.cadrepdpbannerWrapper, styles.topbackSpaceBlock]}>
        <View style={styles.cadrepdpbannerLayout}>
          <Image
            style={[styles.cadrepdpbannerChild, styles.cadrepdpbannerLayout]}
            resizeMode="cover"
            source={require("../assets/rectangle-2.png")}
          />
          <Image
            style={styles.cadrepdpbannerItem}
            resizeMode="cover"
            source={require("../assets/ellipse-8.png")}
          />
        </View>

        {isFriendRequest && (
        <TouchableOpacity onPress={handleAcceptFriendRequest}>
          <Text>Accept Friend Request</Text>
        </TouchableOpacity>
      )}

      </View>

      <View style={[styles.profilinfosection, styles.topbackSpaceBlock]} />

      
      
      {userId === profile.id && (
        <TouchableOpacity onPress={navigateToEditProfile}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={tweets}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            {userId === profile.id && (
              <TouchableOpacity onPress={() => handleDeleteTweet(item.id)}>
                <Text>Delete Tweet</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topbackSpaceBlock: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  cadrepdpbannerLayout: {
    height: 248,
    width: 323,
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
  profil1: {
    fontSize: FontSize.size_xl,
    letterSpacing: 0,
    fontFamily: FontFamily.abelRegular,
    color: Color.white,
    textAlign: "left",
    width: 194,
  },
  profil: {
    marginLeft: 5,
  },
  topback: {
    flexDirection: "row",
  },
  cadrepdpbannerChild: {
    top: 0,
    left: 0,
    borderRadius: 15,
    position: "absolute",
  },
  cadrepdpbannerItem: {
    top: 101,
    left: 98,
    width: 112,
    height: 112,
    position: "absolute",
  },
  cadrepdpbannerWrapper: {
    alignItems: "center",
  },
  profilinfosection: {
    height: 451,
    overflow: "hidden",
  },
  wipeProfilePage: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    height: 783,
    alignItems: "center",
    width: "100%",
  },
});

export default WipeProfilePage;
