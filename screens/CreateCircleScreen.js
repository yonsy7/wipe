import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput, StyleSheet} from 'react-native';
import CircleItem from '../components/CircleItem';
import { getCirclesByUser, createCircle, deleteCircle } from '../services/circles';
import { getUserFriends } from '../services/friends';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebaseConfig';
import { Checkbox } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CreateCircleScreen = () => {
    const [circleName, setCircleName] = useState('');
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchFriends = async () => {
        const fetchedFriends = await getUserFriends(auth.currentUser?.uid);
        setFriends(fetchedFriends);
      };
      fetchFriends();
    }, []);
  
    const onCreateCircle = async () => {
      await createCircle(circleName, selectedFriends);
      navigation.goBack();
    };
  
    const toggleFriend = (friend) => {
      if (selectedFriends.some(f => f[0] === friend.id)) {
        setSelectedFriends(selectedFriends.filter(f => f[0] !== friend.id));
      } else {
        setSelectedFriends([...selectedFriends, [friend.id, friend.username]]);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Circle Name:</Text>
          <TextInput value={circleName} onChangeText={setCircleName} style={styles.input} />
        </View>
        <Text style={styles.subtitle}>Select Friends:</Text>
        {friends.map((friend, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.friendItem, { backgroundColor: selectedFriends.some(f => f[0] === friend.id) ? 'lightgreen' : 'transparent' }]}
            onPress={() => toggleFriend(friend)}
          >
            <Text style={styles.friendText}>{friend.username}</Text>
          </TouchableOpacity>
        ))}
<TouchableOpacity 
  style={[styles.button, !circleName && styles.disabledButton]} 
  onPress={onCreateCircle} 
  disabled={!circleName}
>
  <Text style={styles.buttonText}>Create Circle</Text>
</TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:"#1B103A",
    },
    title: {
      fontSize: 18,
      color: 'white',
      marginRight: 10,
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      marginBottom: 10,
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5,
    },
    friendItem: {
      flexDirection: 'row',
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
    },
    friendText: {
      fontSize: 16,
      color: 'white',
    },
    button: {
      backgroundColor: "#fff",
      color:'black',  // black background
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#000",  // white text
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: "#888",  // grey background for disabled button
    },
    
  });

export default CreateCircleScreen;
