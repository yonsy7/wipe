import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { hasNewNotifications } from '../services/notifications';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await hasNewNotifications();
      setNotifications(fetchedNotifications);
    };
    fetchNotifications();
  }, []);

  const handleNotificationPress = (notification) => {
    switch (notification.type) {
      case 'post':
        navigation.navigate('PostDetails', { postId: notification.postId });
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
    <View style={{backgroundColor:"#1B103A", flex:1}}>
      {notifications?.length < 1? 
      <Text>Aucune Nouvelle Notification</Text> : 
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
        }
    </View>
  );
};

export default NotificationsScreen;