import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, FontSize, Color, FontFamily } from "../GlobalStyles";

const WipeLogPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wipeLogPage}>
      <SystemContainer />
      <View style={[styles.logosection, styles.logosectionSpaceBlock]}>
        <Text style={styles.wipe}>Wipe</Text>
      </View>
      <View
        style={[styles.inscriptionbuttonParent, styles.logosectionSpaceBlock]}
      >
        <TouchableOpacity
          style={[styles.inscriptionbutton, styles.connexionbuttonFlexBox]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("WipeSignUp")}
        >
          <Pressable onPress={() => navigation.navigate("WipeSignUp")}>
            <Text style={styles.inscription1}>{`Inscription `}</Text>
          </Pressable>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.connexionbutton, styles.connexionbuttonFlexBox]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("LogInPage")}
        >
          <Pressable onPress={() => navigation.navigate("LogInPage")}>
            <Text style={styles.inscription1}>Connexion</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logosectionSpaceBlock: {
    marginTop: 121,
    alignItems: "center",
    overflow: "hidden",
  },
  connexionbuttonFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_50xl,
    flexDirection: "row",
    borderRadius: Border.br_31xl,
    justifyContent: "center",
    alignItems: "center",
  },
  wipe: {
    fontSize: FontSize.size_45xl,
    color: Color.white,
    textAlign: "center",
    width: 315,
  },
  logosection: {
    width: 322,
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_16xl,
    justifyContent: "center",
    marginTop: 121,
  },
  inscription1: {
    fontSize: FontSize.size_lg,
    color: Color.midnightblue,
    textAlign: "left",
  },
  inscriptionbutton: {
    backgroundColor: Color.darkturquoise,
  },
  connexionbutton: {
    backgroundColor: Color.white,
    marginTop: 49,
  },
  inscriptionbuttonParent: {
    paddingHorizontal: 73,
    paddingVertical: 54,
    justifyContent: "flex-end",
  },
  wipeLogPage: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    width: "100%",
    height: 812,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default WipeLogPage;
