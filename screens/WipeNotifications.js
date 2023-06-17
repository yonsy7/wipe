import * as React from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import NotifContainer from "../components/NotifContainer";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const WipeNotifications = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    };
    fetchNotifications();
  }, []);


  return (
    <View style={styles.wipeNotifications}>
      <SystemContainer />
      <View style={styles.backnotif}>
        <Pressable style={styles.bakbuttonLayout} onPress={() => {}}>
          <Pressable
            style={[styles.iconchevron, styles.bakbuttonLayout]}
            onPress={() => navigation.navigate("WipeHomePage")}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/iconchevron.png")}
            />
          </Pressable>
        </Pressable>
        <Pressable
          style={styles.notifications}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Text style={styles.notifications1}>Notifications</Text>
        </Pressable>
      </View>
      <View style={styles.listviewnotif}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <>
          <NotifContainer notification={item}/>
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bakbuttonLayout: {
    height: 24,
    width: 24,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  iconchevron: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  notifications1: {
    fontSize: FontSize.size_xl,
    letterSpacing: 0,
    fontFamily: FontFamily.abelRegular,
    color: Color.white,
    textAlign: "left",
    width: 124,
  },
  notifications: {
    marginLeft: 5,
  },
  backnotif: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  listviewnotif: {
    height: 744,
    paddingTop: Padding.p_3xl,
    alignSelf: "stretch",
  },
  wipeNotifications: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    height: 814,
    alignItems: "flex-end",
    width: "100%",
  },
});

export default WipeNotifications;
