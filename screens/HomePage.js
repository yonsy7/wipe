import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity, Button, Pressable, StyleSheet } from 'react-native';
import Tweet from '../components/Tweet';
import { getFeedTweets, updateArray } from '../services/feed';
import { hasNewNotifications } from '../services/notifications'; // Importez cette fonction depuis votre fichier de service de notifications
import { useNavigation } from '@react-navigation/core';
import { auth } from '../services/firebaseConfig';
const HomeScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [newNotifications, setNewNotifications] = useState(false);
  const [firstVisible, setFirstVisible] = useState(null);

  const navigation = useNavigation();

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
  const { tweets: newTweets, lastVisible: newLastVisible } = await getFeedTweets(null); // Fetch tweets from the start
  setTweets(newTweets);
  setFirstVisible(newTweets[0]);
  setLastVisible(newLastVisible);
  setHasMore(newTweets.length > 0);
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
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadTweets}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshTweets} />}
        ListFooterComponent={loadingMore && <ActivityIndicator />}
      />
      
      <TouchableOpacity style={styles.floatingButton}
      onPress={() => navigation.navigate('WipeMessagePage')}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B103A',
    position: 'relative',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#29EBA5',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  plusIcon: {
    fontSize: 30,
    color: '#fff',
  }
})

export default HomeScreen;