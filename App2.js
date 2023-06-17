import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Log';
import RegisterScreen from './screens/RegisterScreen';
import { firebase } from './services/firebaseConfig';
import HomeScreen from './screens/HomeScreen'
import ThreadScreen from './screens/ThreadScreen';
import ComposeCommentScreen from './screens/ComposeCommentScreen';
import { Alert } from 'react-native';
import { requestUserPermission, onMessageListener } from './services/notifications';
import UserProfile from './screens/UserProfile';
import EditProfile from './screens/EditProfile';
import ComposeTweetScreen from './screens/ComposeTweetScreen';

const Stack = createStackNavigator();


const App = () => {
	const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const requestPermission = async () => {
      await requestUserPermission();
    };

    requestPermission();

    const unsubscribe = onMessageListener().then((payload) => {
      Alert.alert('New Notification', JSON.stringify(payload.notification));
    });

    return () => unsubscribe;
  }, []);

return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'HomeScreen' : 'LoginScreen'}>
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
				<Stack.Screen name="HomePage" component={HomeScreen} />
				<Stack.Screen name="Thread" component={ThreadScreen} />
				<Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
				<Stack.Screen name="ComposeComment" component={ComposeCommentScreen} />
				<Stack.Screen name="ComposeTweet" component={ComposeTweetScreen} />
			</Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;