import * as React from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, Color } from "../GlobalStyles";
import { auth } from "../services/firebaseConfig";

const HomePageContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.tophomepage}>
      <View style={styles.iconeajouterWrapper}>
        <TouchableOpacity
          style={styles.iconeajouter}
          activeOpacity={0.2}
          onLongPress={() => navigation.navigate("WipeAddFriends")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/iconeajouter.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.wipeWrapper, styles.wipeWrapperFlexBox]}>
        <Text style={styles.wipe}>Wipe</Text>
      </View>
      <View style={[styles.tophomepageInner, styles.tophomepageInnerFlexBox]}>
        <Pressable
          style={styles.tophomepageInnerFlexBox}
          onPress={() => navigation.navigate("WipeProfilePage")}
        >
          <Pressable
            style={styles.d8bb28d331ec1cf9b55c33364ec72c}
            onPress={() => navigation.navigate("WipeProfilePage", auth.currentUser?.uid)}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/d8bb28d331ec1cf9b55c33364ec72cb5sticker-11.png")}
            />
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wipeWrapperFlexBox: {
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  tophomepageInnerFlexBox: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  iconeajouter: {
    width: 54,
    height: 54,
  },
  iconeajouterWrapper: {
    width: 131,
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: 0,
    overflow: "hidden",
    flexDirection: "row",
  },
  wipe: {
    fontSize: 30,
    fontFamily: FontFamily.abelRegular,
    color: Color.white,
    textAlign: "center",
    width: 205,
    alignSelf: "stretch",
  },
  wipeWrapper: {
    padding: Padding.p_3xs,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  d8bb28d331ec1cf9b55c33364ec72c: {
    width: 55,
    height: 55,
  },
  tophomepageInner: {
    paddingHorizontal: Padding.p_3xs,
    flex: 1,
    overflow: "hidden",
    alignSelf: "stretch",
    paddingVertical: 0,
  },
  tophomepage: {
    marginTop: 5,
    flexDirection: "row",
    height: 55,
    alignSelf: "stretch",
  },
});

export default HomePageContainer;
