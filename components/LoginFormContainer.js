import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const LoginFormContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.connexionframe}>
      <View style={styles.mdpfieldLayout}>
        <Text style={[styles.nomDutilisateurOu, styles.connexion1Typo]}>
           Email
        </Text>
        <Image
          style={[styles.usernameormailfieldChild, styles.childLayout]}
          resizeMode="cover"
          source={require("../assets/vector-14.png")}
        />
      </View>
      <View style={[styles.mdpfield, styles.mdpfieldLayout]}>
        <Image
          style={[styles.mdpfieldChild, styles.childLayout]}
          resizeMode="cover"
          source={require("../assets/vector-14.png")}
        />
        <Text style={[styles.nomDutilisateurOu, styles.connexion1Typo]}>
          Mot de passe
        </Text>
      </View>
      <Text style={[styles.motDePasse1, styles.connexion1Typo]}>
        Mot de passe oublié ?
      </Text>
      <View style={styles.connexionbutton}>
        <Pressable
          style={styles.connexion}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Text style={[styles.connexion1, styles.connexion1Typo]}>
            Connexion
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  connexion1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  childLayout: {
    height: 1,
    left: 0,
    position: "absolute",
    width: 263,
  },
  mdpfieldLayout: {
    height: 20,
    width: 263,
  },
  nomDutilisateurOu: {
    top: 0,
    left: 1,
    fontSize: FontSize.size_base,
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    position: "absolute",
  },
  usernameormailfieldChild: {
    top: 19,
  },
  mdpfieldChild: {
    top: 20,
  },
  mdpfield: {
    marginTop: 38,
  },
  motDePasse1: {
    fontSize: FontSize.caption10SemiBold_size,
    marginTop: 38,
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  connexion1: {
    fontSize: FontSize.size_lg,
    color: Color.midnightblue,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  connexion: {
    left: 69,
    top: 13,
    position: "absolute",
  },
  connexionbutton: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    width: 228,
    height: 48,
    marginTop: 38,
  },
  connexionframe: {
    width: 375,
    overflow: "hidden",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_9xl,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
});

export default LoginFormContainer;
