import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { getUserProfile, getUserTweets, deleteTweet } from '../services/users';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebaseConfig';
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import SystemContainer from "../components/SystemContainer";
import defaultProfilePic from '../assets/profilePicture.jpg'; // Import your default profile picture
import defaultBanner from '../assets/banner.png'; // Import your default banner

const UserProfile = ({ route }) => {
  const { userId, isFriendRequest } = route.params;
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getUserProfile(userId);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTweets = async () => {
      try {
        const fetchedTweets = await getUserTweets(userId);
        setTweets(fetchedTweets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
    fetchTweets();
  }, [userId]);

  const handleAcceptFriendRequest = async () => {
    await acceptFriendRequest(userId);
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await deleteTweet(tweetId);
      const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetId);
      setTweets(updatedTweets);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile || !tweets) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.userProfilePage}>
      <View style={styles.bannerContainer}>
  <Image
    source={profile.bannerUrl ? { uri: profile.bannerUrl } : defaultBanner}
    style={styles.banner}
  />
  <Image
    source={profile.profilePictureUrl ? { uri: profile.profilePictureUrl } : defaultProfilePic}
    style={styles.profilePic}
  />
</View>
      <Text style={styles.username}>{profile.username}</Text>
      <Text style={styles.joinDate}>Joined: {new Date(profile.joinDate).toLocaleDateString()}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
      
      {isFriendRequest && (
        <TouchableOpacity onPress={handleAcceptFriendRequest} style={styles.actionButton}>
          <Text style={styles.buttonText}>Accept Friend Request</Text>
        </TouchableOpacity>
      )}

      {userId === profile.id && (
        <TouchableOpacity onPress={navigateToEditProfile} style={styles.actionButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={tweets}
        renderItem={({ item }) =>
          (<View style={styles.tweetItem}>
            <Text style={styles.tweetContent}>{item.content}</Text>
            <Text style={styles.tweetDate}>{new Date(item.createdAt).toLocaleString()}</Text>
            {userId === profile.id && (
              <TouchableOpacity onPress={() => handleDeleteTweet(item.id)} style={styles.actionButton}>
                <Text style={styles.buttonText}>Delete Tweet</Text>
              </TouchableOpacity>
            )}
          </View>)
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userProfilePage: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    padding: Padding.p_2xs,
    width: "100%",
  },
  bannerContainer: {
    position: 'relative', // Ensure that children can be positioned absolutely
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5, // Half outside of the banner
    alignSelf: 'center',
  },
  username: {
    fontSize: 18,
    color: Color.white,
  },
  joinDate: {
    fontSize: FontSize.size_md,
    color: Color.grey,
  },
  bio: {
    fontSize: FontSize.size_md,
    color: Color.white,
  },
  actionButton: {
    borderRadius: Border.br_31xl,
    backgroundColor: 'rgba(123, 104, 238, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    flexDirection: "row",
    
    alignSelf: 'center',
    marginTop: Padding.p_2xs,
  },
  buttonText: {
    fontSize: FontSize.size_md,
    color: Color.white,
  },
  tweetItem: {
    backgroundColor: 'rgba(123, 104, 238, 0.5)',
    padding: Padding.p_2xs,
    borderRadius: Border.br_31xl,
    marginTop: Padding.p_2xs,
  },
  tweetContent: {
    fontSize: FontSize.size_md,
    color: Color.white,
  },
  tweetDate: {
    fontSize: FontSize.size_sm,
    color: Color.grey,
  },
});

export default UserProfile;
