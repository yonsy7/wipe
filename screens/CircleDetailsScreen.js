import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getCircleDetails, addUserToCircle, removeUserFromCircle } from '../services/circles';
import { getUserFriends } from '../services/friends';
import { useRoute } from '@react-navigation/native';
import { auth } from '../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';


const CircleDetailsPage = ({route}) => {
  const [circleDetails, setCircleDetails] = useState(null);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { circleId } = route.params;

  useEffect(() => {
    const fetchCircleDetails = async () => {
      const fetchedCircleDetails = await getCircleDetails(circleId);
      setCircleDetails(fetchedCircleDetails);
      const fetchedFriends = await getUserFriends();
      setFriends(fetchedFriends);
    };
    fetchCircleDetails();
  }, [circleId]);

  const onAddUsers = async () => {
    if (selectedFriends.length > 0) {
      const updatedCircleDetails = await Promise.all(selectedFriends.map(newUser => addUserToCircle(circleId, newUser.username, newUser.id)));
      setCircleDetails(updatedCircleDetails[0]); // use the first updatedCircleDetails
      setSelectedFriends([]);
    }
  };

  const onRemoveUser = async (userId, username) => {
    const updatedCircleDetails = await removeUserFromCircle(circleId, userId, username);
    setCircleDetails(updatedCircleDetails);
  };

  const onSelectFriend = (friend) => {
    if (selectedFriends.find(selected => selected.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter(selected => selected.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  if (!circleDetails) {
    return <Text>Loading...</Text>;
  }

  const filteredFriends = friends.filter(friend => 
    friend.username.toLowerCase().startsWith(searchQuery.toLowerCase()) 
    && !circleDetails.users.find(user => user.id === friend.id)
    && !selectedFriends.find(selected => selected.id === friend.id));

    return (
      <View style={styles.container}>
        <Text style={[styles.title, {textAlign:'center'}]}>{circleDetails.name}</Text>
        <FlatList
          data={circleDetails.users}
          
          renderItem={({ item }) => (
            item.id !== auth.currentUser.uid ? 
            <View style={styles.listItem}>
              <Text style={styles.username}>{item.username}</Text>
              <TouchableOpacity style={styles.button} onPress={() => onRemoveUser(item.id, item.username)}>
                <Ionicons name="remove" size={24} color="white" />
              </TouchableOpacity>
            </View>
            : null
          )}
          keyExtractor={(item, index) => item.id}
        />
        <Text style={styles.title}>Add new members</Text>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search friends"
        />
        {selectedFriends.length > 0 && 
          <View>
            <Text style={styles.subTitle}>Selected Friends</Text>
            <FlatList
              data={selectedFriends}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => <Text style={styles.username}>{item.username}</Text>}
              keyExtractor={(item, index) => item.id}
            />
            <TouchableOpacity style={styles.button} onPress={onAddUsers}>
              <Text style={styles.buttonText}>Add Selected Users</Text>
            </TouchableOpacity>
          </View>
        }
        
        <FlatList
          data={filteredFriends}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.listItem, selectedFriends.find(selected => selected.id === item.id) && styles.selected]}
              onPress={() => onSelectFriend(item)}
            >
              <Text style={styles.username}>{item.username}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
          }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#1B103A',
        padding: 20,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
      },
      subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 10,
      },
      listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      },
      username: {
        color: 'white',
        fontSize: 16,
      },
      button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
      },
      separator: {
        height: 1,
        backgroundColor: '#444',
        marginVertical: 5,
      },
      input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
      selected: {
        backgroundColor: '#3D3062',
      },
    });

export default CircleDetailsPage