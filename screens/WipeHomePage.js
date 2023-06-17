
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {RefreshControl, ActivityIndicator, Button } from 'react-native';
import SystemContainer from "../components/SystemContainer";
import HomePageContainer from "../components/HomePageContainer";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, Border, Color } from "../GlobalStyles";
import Tweet from "../components/Tweet";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { getFeedTweets } from "../services/feed";
import { hasNewNotifications } from "../services/notifications";



const WipeHomePage = () => {
  const navigation = useNavigation();
  const [tweets, setTweets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [newNotifications, setNewNotifications] = useState(false);

  const loadTweets = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const { tweets: newTweets, lastVisible: newLastVisible } = await getFeedTweets(lastVisible);
    setTweets((prevTweets) => [...prevTweets, ...newTweets]);
    setLastVisible(newLastVisible);
    setLoadingMore(false);
    setHasMore(newTweets.length > 0);
  };

  const refreshTweets = async () => {
    setRefreshing(true);
    setLastVisible(null);
    setHasMore(true);
    setTweets([]);
    await loadTweets();
    setRefreshing(false);
  };

  const checkNewNotifications = async () => {
    const hasNew = await hasNewNotifications();
    setNewNotifications(hasNew);
  };

  useEffect(() => {
    refreshTweets();
    const interval = setInterval(checkNewNotifications, 30000); // Vérifier les nouvelles notifications toutes les 30 secondes
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.wipeHomePage}>
      <SystemContainer />
      <HomePageContainer />
      <View
        style={[styles.notificationicon, styles.notificationiconSpaceBlock]}
      >
        <Pressable
          style={styles.notificationsOutline}
          onPress={() => navigation.navigate("WipeNotifications")}
        >
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
          <Text style={styles.text}>{`• `}</Text>
        </Pressable>
      </View>
      <ScrollView
        style={[styles.listviewfiltweet, styles.notificationiconSpaceBlock]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listViewFilTweetScrollViewContent}
      >
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadTweets}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshTweets} />}
        ListFooterComponent={loadingMore && <ActivityIndicator />}
      />
        
        <View style={[styles.iconWrapper, styles.iconWrapperFlexBox]}>
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("WipeMessagePage")}
          >
            <Image
              style={styles.icon1}
              resizeMode="cover"
              source={require("../assets/icon.png")}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listViewFilTweetScrollViewContent: {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  notificationiconSpaceBlock: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  iconWrapperFlexBox: {
    alignItems: "flex-end",
    paddingRight: Padding.p_2xs,
  },
  vectorIcon: {
    height: "90.73%",
    width: "78.39%",
    top: "4.63%",
    right: "10.81%",
    bottom: "4.63%",
    left: "10.8%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    top: 30,
    left: 16,
    fontSize: 24,
    letterSpacing: 0,
    fontFamily: FontFamily.abelRegular,
    color: "#ff0000",
    textAlign: "left",
    width: 14,
    height: 14,
    position: "absolute",
  },
  notificationsOutline: {
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  notificationicon: {
    alignItems: "flex-end",
    paddingRight: Padding.p_2xs,
  },
  icon1: {
    borderRadius: Border.br_81xl,
    height: "100%",
    width: "100%",
  },
  icon: {
    width: 57,
    height: 55,
  },
  iconWrapper: {
    marginTop: 430,
    alignSelf: "stretch",
    paddingRight: Padding.p_2xs,
  },
  listviewfiltweet: {
    overflow: "hidden",
    flex: 1,
  },
  wipeHomePage: {
    backgroundColor: Color.midnightblue,
    height: 802,
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});

export default WipeHomePage;
