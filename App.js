import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Log';
import HomeScreen from './screens/HomePage';
import { firebase } from './services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import WipeHomePage from './screens/WipeHomePage';
import WipeLoadPage from "./screens/WipeLoadPage";
import WipeMessagePage from "./screens/WipeMessagePage";
import WipeProfilePage from "./screens/WipeProfilePage";
import WipeCirclesPage from "./screens/WipeCirclesPage";
import WipeAddFriends from "./screens/WipeAddFriends";
import WipeNotifications from "./screens/WipeNotifications";
import WipeDiscussionPage from "./screens/WipeDiscussionPage";
import WipeSignUp from "./screens/WipeSignUp";
import WipeLogPage from "./screens/WipeLogPage";
import WipeLogIn from "./screens/WipeLogIn";
const Stack = createNativeStackNavigator();
const auth = getAuth(firebase);
import UserProfile from './screens/UserProfile';
import ThreadScreen from './screens/ThreadScreen';
import ComposeCommentScreen from './screens/ComposeCommentScreen';
import FriendsScreen from './screens/FriendsScreen';
import CirclesScreen from './screens/CirclesScreen';
import CreateCircleScreen from './screens/CreateCircleScreen';
import CircleDetailsPage from './screens/CircleDetailsScreen';
import NotificationsScreen from './screens/NotificationsScreens';
import EditProfile from './screens/EditProfile';
import LoginPage from './screens/LoginPage';

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false); // set loading to false after getting user data
      });
  
      return () => unsubscribe();
    }, []);
  
    // Don't render navigation until Firebase finishes checking auth state
    if (loading) {
      return null; // or a loading spinner if you have one
    }
  
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? 'Home' : 'WipeLogPage'}>
          
        
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="LogInPage" component={LoginPage} />
          <Stack.Screen options={{ headerShown: false }} name="SignUpPage" component={LoginScreen} />
          <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({ // <-- destructuring navigation from options
    title: 'Wipe',
    headerBackTitleVisible: false,
              headerBackTitle: ' ',  
    headerStyle: {
      backgroundColor: '#1B103A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25,
    },
    headerLeft: () => (
      <Icon.Button
        name="people-outline"
        size={25}
        backgroundColor="#1B103A"
        color="#fff"
        onPress={() => navigation.navigate('Friends')}
      />
    ),
    headerRight: () => (
      <View style={{ flexDirection: 'row', paddingRight: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon
            name="notifications-outline"
            size={25}
            color="#fff"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: auth.currentUser.uid })}> 
          <Icon
            name="person-circle-outline"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    ),
  })}
/>
          <Stack.Screen
              name="Profile"
              component={UserProfile}
              options={{ 
                
                headerTitle: 'Profile', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:20,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              />
          <Stack.Screen
              name="Thread"
              component={ThreadScreen}
              />
          <Stack.Screen
              name="ComposeComment"
              component={ComposeCommentScreen}
              options={{ 
                headerBackTitleVisible: false,
              headerBackTitle: ' ',  
                headerTitle: 'Comment', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
          <Stack.Screen
              name="Friends"
              component={FriendsScreen}
              options={{ 
                headerBackTitleVisible: false,
              headerBackTitle: ' ',  
                headerTitle: 'Friends', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:20,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
          <Stack.Screen
              name="Circles"
              component={CirclesScreen}
              options={{ 
                
              
                headerTitle: 'Circles', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'semi-bold',
      fontSize:20,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
          <Stack.Screen
              name="CreateCircle"
              component={CreateCircleScreen}
              options={{ 
                headerBackTitleVisible: false,
              headerBackTitle: ' ',  
                headerTitle: 'Create a new Circle', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:20,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
          <Stack.Screen
              name="CircleDetails"
              component={CircleDetailsPage}
              options={{ 
                
                headerTitle: '', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:20,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
              />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ 
              headerBackTitleVisible: false,
            headerBackTitle: ' ',  
              headerTitle: 'Notifications', 
              headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:20,
  },
               headerStyle: {
              backgroundColor: '#1B103A',
            },
          }}
            />

            
              
          <Stack.Screen
              name="WipeLoadPage"
              component={WipeLoadPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
  name="WipeMessagePage"
  component={WipeMessagePage}
  options={{ 
    headerTitle: '', 
    
     headerStyle: {
    backgroundColor: '#1B103A',
  },}}
/>
            <Stack.Screen
              name="WipeProfilePage"
              component={WipeProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeCirclesPage"
              component={WipeCirclesPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeAddFriends"
              component={WipeAddFriends}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeNotifications"
              component={WipeNotifications}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeDiscussionPage"
              component={WipeDiscussionPage}
              options={{ 
                headerBackTitleVisible: false,
              headerBackTitle: ' ',  
                headerTitle: 'Discussion', 
                headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25,
    },
                 headerStyle: {
                backgroundColor: '#1B103A',
              },
            }}
            />
            <Stack.Screen
              name="WipeSignUp"
              component={WipeSignUp}
            />
            <Stack.Screen
              name="WipeHomePage"
              component={WipeHomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeLogPage"
              component={WipeLogPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeLogIn"
              component={WipeLogIn}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  