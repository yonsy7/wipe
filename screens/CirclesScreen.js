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

const CirclesScreen = () => {
  const [circles, setCircles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleName, setCircleName] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCircles = async () => {
      const fetchedCircles = await getCirclesByUser(auth.currentUser?.uid);
      setCircles(fetchedCircles);
    };
    fetchCircles();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      const fetchedFriends = await getUserFriends(auth.currentUser?.uid);
      setFriends(fetchedFriends);
    };
    fetchFriends();
  }, []);

  const onCreateCircle = async () => {
    const newCircle = await createCircle(circleName, selectedFriends);
    setCircles([...circles, newCircle]);
    setModalVisible(false);
  };

  const onDeleteCircle = async (circleId) => {
    await deleteCircle(circleId);
    setCircles(circles.filter((circle) => circle.id !== circleId));
  };

  const navigateToFriends = () => {
    navigation.navigate('Friends');
  };

  const navigateToCircleDetails = (circleId) => {
    navigation.navigate('CircleDetails', { circleId });
  };

  const toggleFriend = (friend) => {
    if (selectedFriends.includes(friend.id)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend.id]);
    }
  };
  

  return (
    <View style={{backgroundColor:"#1B103A", flex:1, paddingTop:15}}>
      <FlatList
        data={circles}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToCircleDetails(item.id)}>
          <CircleItem
            circle={item}
            onDelete={() => onDeleteCircle(item.id)}
            
          />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{justifyContent:'centers',marginBottom:10}}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('CreateCircle')} 
      style={{borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        margin:"auto",
        justifyContent:"center",
        width:"auto",
        padding: 10,
        borderRadius: 23,
        alignSelf: 'flex-start', 
        alignSelf:'center'
      }}><Text style= {{
          color: 'black',
          fontSize: 15,
          textAlign: 'center'
      }}>Create Circle</Text></TouchableOpacity>
      </View>
      
      <View style={styles.switchContainer}>
        <TouchableOpacity style={[styles.switchButton1, {backgroundColor:"#3D3062"}]}  onPress={() => navigation.navigate('Friends')}>
          
        <Text style={styles.switchText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchButton} >
          <Text style={styles.switchButtonText}>Circles</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToFriends}>
        <Text>Go to Friends</Text>
      </TouchableOpacity>
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

export default CirclesScreen;