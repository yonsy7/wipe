import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { searchUsers, getFriendRequests, acceptFriendRequest, rejectFriendRequest, addFriend, getUserFriends, deleteFriendRequest } from '../services/friends';
import { auth } from '../services/firebaseConfig';
import QRCodeScanner from '../components/QrCodeScanner';

import { Camera, CameraType } from 'expo-camera';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const requests = await getFriendRequests();
      setFriendRequests(requests);
    };

    const fetchUserFriends = async () => {
      const userFriends = await getUserFriends();
      setFriends(userFriends);
    };

    fetchFriendRequests();
    fetchUserFriends();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
  
    if (text.length > 4) {
      const results = await searchUsers(text);
      const resultsWithFriendStatus = results.map(result => ({
        ...result,
        isFriend: friends.some(friend => friend.id === result.id)
      }));
      setSearchResults(resultsWithFriendStatus);
    } else {
      setSearchResults([]); // Clear search results if input text is less than 4 characters
    }
  };
  
  const handleAcceptRequest = async (requestId) => {
    await acceptFriendRequest(requestId);
    const updatedRequests = friendRequests.filter(request => request.id !== requestId);
    setFriendRequests(updatedRequests);
  };

  const handleRejectRequest = async (requestId) => {
    await rejectFriendRequest(requestId);
    const updatedRequests = friendRequests.filter(request => request.id !== requestId);
    setFriendRequests(updatedRequests);
  };

  const handleAddFriend = async (userId) => {
    await addFriend(userId);
    const updatedResults = searchResults.map(result => {
      if (result.id === userId) {
        return { ...result, isFriend: true };
      }
      return result;
    });
    setSearchResults(updatedResults);
  };

  const handleRemoveFriend = async (userId) => {
    await deleteFriendRequest(userId); // Assuming you have a deleteFriendRequest function
    const updatedResults = searchResults.map(result => {
      if (result.id === userId) {
        return { ...result, isFriend: false };
      }
      return result;
    });
    setSearchResults(updatedResults);
  };

  const toggleCamera = () => {
    setCameraVisible(!cameraVisible);
  };

  const handleQRCodeScanned = async ({ data }) => {
    await addFriend(data);
    toggleCamera();
  };

  const handleCameraIconPress = () => {
    toggleCamera();
  };


  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchSection}>
        <MaterialIcons style={styles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search for a user"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleCameraIconPress}>
          <MaterialIcons name="photo-camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* QR code scanner */}
      {cameraVisible && (
        <QRCodeScanner onScan={handleQRCodeScanned} onClose={toggleCamera} style={styles.qrCodeContainer}/>
      )}

      {/* Search results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View>
              <Text>{item.username}</Text>
              {item.isFriend ? (
                <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
                  <Text>Added</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleAddFriend(item.id)}>
                  <Text>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}


      {/* User's QR code */}
      <Text style={styles.title}>Ajouter des amis</Text>
      <View style={styles.qrCodeContainer}>
        <QRCode value="YOUR_USER_ID" size={200} />
      </View>

      <Text style={styles.title}>Ils veulent t'ajouter</Text>

      {/* Friend requests */}
      <View style={{backgroundColor:'#3D3062', flex:1, height:170, borderRadius:15}}>
  <FlatList
    data={friendRequests}
    renderItem={({ item }) => (
      <View>
        <Text>{item.fromUserName}</Text>
        <TouchableOpacity onPress={() => handleAcceptRequest(item.id)}>
          <Text>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRejectRequest(item.id)}>
          <Text>Rejeter</Text>
        </TouchableOpacity>
      </View>
    )}
    keyExtractor={(item) => item.id}
  />
</View>



      {/*
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            </View>

        )}
        keyExtractor={(item, index) => index}
        />*/}


      {/* Add contacts section */}
      {/* You can use a FlatList similar to the search results and friend requests to display the suggested contacts */}

      {/* Button to navigate to CirclesScreen */}
      <View style={styles.switchContainer}>
        <View style={[styles.switchButton, {backgroundColor:"#3D3062"}]}>
        <Text style={styles.switchText}>Friends</Text>
        </View>
        <TouchableOpacity style={styles.switchButton1} onPress={() => navigation.navigate('Circles')}>
          <Text style={styles.switchButtonText}>Circles</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'semi-bold',
    marginBottom: 20,
    color:"white",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1B103A',

  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 10,
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  requestsContainer: {
    marginBottom: 20,
    backgroundColor: '#3D3062',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    padding: 7,
    margin: 7,
    color:"white",
    backgroundColor: "#3D3062",
  },
  switchText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color:"white",
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    color:"white",
    padding: 7,
    backgroundColor: "3D3062",
  },
  switchButton1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    color:"white",
  },
  switchButtonText: {
    fontSize: 13,
    color:"white",
  },
  // Add more styles as needed
});

export default FriendsScreen;