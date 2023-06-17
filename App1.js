const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import WipeLoadPage from "./screens/WipeLoadPage";
import WipeMessagePage from "./screens/WipeMessagePage";
import WipeProfilePage from "./screens/WipeProfilePage";
import WipeCirclesPage from "./screens/WipeCirclesPage";
import WipeAddFriends from "./screens/WipeAddFriends";
import WipeNotifications from "./screens/WipeNotifications";
import WipeDiscussionPage from "./screens/WipeDiscussionPage";
import WipeSignUp from "./screens/WipeSignUp";
import WipeHomePage from "./screens/WipeHomePage";
import WipeLogPage from "./screens/WipeLogPage";
import WipeLogIn from "./screens/WipeLogIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

 
const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [fontsLoaded, error] = useFonts({
    Abel_regular: require("./assets/fonts/Abel_regular.ttf"),
    "Open Sans_semibold": require("./assets/fonts/Open_Sans_semibold.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="WipeLogPage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="WipeLoadPage"
              component={WipeLoadPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeMessagePage"
              component={WipeMessagePage}
              options={{ headerShown: false }}
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WipeSignUp"
              component={WipeSignUp}
              options={{ headerShown: false }}
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
        ) : (
          <WipeLoadPage />
        )}
      </NavigationContainer>
    </>
  );
};
export default App;
