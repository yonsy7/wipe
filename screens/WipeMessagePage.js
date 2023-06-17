import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, FlatList, Alert, Text } from 'react-native';
import { View, Pressable, StyleSheet, Image } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Padding, Color, Border } from "../GlobalStyles";
import Icon from 'react-native-vector-icons/Ionicons';


import { getCirclesByUser } from '../services/circles';
import { createTweet } from '../services/tweets';
import { auth } from "../services/firebaseConfig";

const TWEET_CHARACTER_LIMIT = 280;  // Twitter standard is 280 characters

const WipeMessagePage = () => {
  const navigation = useNavigation();
  const [tweetText, setTweetText] = useState('');
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [isCircleSelectionVisible, setIsCircleSelectionVisible] = useState(false);
  //...

  const handleGroupIconPress = () => {
    setIsCircleSelectionVisible(!isCircleSelectionVisible);
  };


  useEffect(() => {
    const fetchCircles = async () => {
      const circlesData = await getCirclesByUser(auth.currentUser?.uid);
      setCircles(circlesData);
    };

    fetchCircles();
  }, []);

  const handleCircleSelection = (circleId) => {
    if (selectedCircles.includes(circleId)) {
      setSelectedCircles(selectedCircles.filter((id) => id !== circleId));
    } else {
      setSelectedCircles([...selectedCircles, circleId]);
    }
  };

  const handlePublish = async () => {
    if (tweetText.trim() === '') {
      Alert.alert('Error', 'Tweet cannot be empty');
      return;
    }

    if (tweetText.length > TWEET_CHARACTER_LIMIT) {
      Alert.alert('Error', `Tweet cannot be more than ${TWEET_CHARACTER_LIMIT} characters`);
      return;
    }

    await createTweet(tweetText, selectedCircles);
    navigation.goBack();
  };

  return (
    <View style={styles.wipeMessagePage}>
      <View style={styles.queSePasseTilDansLeMeilWrapper}>
        <TextInput 
          style={[styles.queSePasse, styles.annuler1Typo]}
          value={tweetText}
          onChangeText={setTweetText}
          placeholder="Que se passe t’il dans le meilleur des mondes ?"
          maxLength={TWEET_CHARACTER_LIMIT}
        />
        <Text>{tweetText.length}/{TWEET_CHARACTER_LIMIT}</Text>
        {isCircleSelectionVisible && (
          <View>
        <Text style={{color: "white", fontSize: 16, justifyContent:'center'}}>Select the circles you want to share with</Text>
        <FlatList
  data={circles}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.listContainer}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.circleItem,
        selectedCircles.includes(item.id) ? styles.circleItemSelected : null,
      ]}
      onPress={() => handleCircleSelection(item.id)}
    >
      <Text style={styles.circleItemText}>
        {item.name}
      </Text>
      {selectedCircles.includes(item.id) && (
        <Icon name="checkmark-circle" size={24} color="#fff" />
      )}
    </TouchableOpacity>
  )}
/>
</View>)}

      </View>
      <View style={[styles.frameParent, styles.frameParentFlexBox]}>
      <TouchableOpacity onPress={handleGroupIconPress}>
        <View>
          <View style={[styles.icon, styles.iconSpaceBlock]}>
            <Image
              style={styles.groupIcon}
              resizeMode="cover"
              source={require("../assets/group.png")}
            />
          </View>
        </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Pressable
            style={[styles.icon1, styles.iconSpaceBlock]}
            onPress={handlePublish}
          >
            <Image
              style={styles.iconColor}
              resizeMode="cover"
              source={require("../assets/iconcolor.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParentFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  annuler1Typo: {
    textAlign: "left",
    color: '#000',
    fontSize: FontSize.size_md,
  },
  iconSpaceBlock: {
    justifyContent: "center",
    padding: Padding.p_base,
    backgroundColor: Color.white,
    borderRadius: Border.br_81xl,
    height: 55,
    width: 55,
    alignItems: "center",
  },
  queSePasseTilDansLeMeilWrapper: {
    paddingLeft: Padding.p_4xs,
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-between",
  },
  groupIcon: {
    width: 28,
    height: 24,
  },
  icon: {
    paddingTop: Padding.p_2xs,
  },
  iconColor: {
    width: 23,
    height: 23,
  },
  icon1: {
    paddingTop: Padding.p_base,
  },
  iconContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  frameParent: {
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_11xs,
    alignItems: "center",
  },
  wipeMessagePage: {
    backgroundColor: "#1B103A",
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  queSePasse: {
    color: Color.grey,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    fontSize: FontSize.size_md,
  },
  listContainer: {
    paddingVertical: 10,
  },
  circleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3C3C3C",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  circleItemSelected: {
    backgroundColor: "#1B103A",
  },
  circleItemText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WipeMessagePage;
