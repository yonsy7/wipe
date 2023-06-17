import * as React from "react";
import { Text, StyleSheet, Pressable, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const FormContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.inscriptionform}>
      <View style={styles.inscriptionbutton}>
        <Pressable
          style={styles.inscription}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Text style={styles.inscription1}>Inscription</Text>
        </Pressable>
      </View>
      <View style={[styles.nomprenom, styles.nomprenomPosition]}>
        <View style={styles.namefield}>
          <Text style={[styles.nom, styles.motTypo]}>Nom</Text>
          <Image
            style={[styles.namefieldChild, styles.childPosition]}
            resizeMode="cover"
            source={require("../assets/vector-1.png")}
          />
        </View>
        <View style={styles.prenomfield}>
          <Text style={[styles.nom, styles.motTypo]}>Prénom</Text>
          <Image
            style={[styles.namefieldChild, styles.childPosition]}
            resizeMode="cover"
            source={require("../assets/vector-1.png")}
          />
        </View>
      </View>
      <View style={[styles.passwordfield, styles.passwordfieldLayout]}>
        <Text
          style={[styles.motDePasse, styles.motTypo]}
        >{`Mot de passe `}</Text>
        <Image
          style={[styles.passwordfieldChild, styles.passwordfieldLayout]}
          resizeMode="cover"
          source={require("../assets/vector-11.png")}
        />
      </View>
      <View style={[styles.birthmail, styles.nomprenomPosition]}>
        <View style={styles.birthfield}>
          <Text
            style={[styles.dateDeNaissance, styles.motTypo]}
          >{`Date de naissance `}</Text>
          <Image
            style={[styles.birthfieldChild, styles.birthfieldChildPosition]}
            resizeMode="cover"
            source={require("../assets/vector-12.png")}
          />
        </View>
        <View style={styles.emailinput}>
          <View style={[styles.emailParent, styles.nomPosition]}>
            <Text style={[styles.nom, styles.motTypo]}>Email</Text>
            <Image
              style={[styles.namefieldChild, styles.childPosition]}
              resizeMode="cover"
              source={require("../assets/vector-1.png")}
            />
          </View>
        </View>
      </View>
      <View
        style={[styles.passwordconfirmation, styles.passwordconfirmationLayout]}
      >
        <Image
          style={[
            styles.passwordconfirmationChild,
            styles.passwordconfirmationLayout,
          ]}
          resizeMode="cover"
          source={require("../assets/vector-13.png")}
        />
        <Text
          style={[styles.confirmationDuMot, styles.birthfieldChildPosition]}
        >
          Confirmation du mot de passe
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nomprenomPosition: {
    flexDirection: "row",
    left: 11,
    position: "absolute",
  },
  motTypo: {
    color: Color.white,
    fontSize: FontSize.size_base,
    top: 0,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  childPosition: {
    top: 19,
    height: 1,
    left: 0,
  },
  passwordfieldLayout: {
    width: 183,
    position: "absolute",
  },
  birthfieldChildPosition: {
    left: 1,
    position: "absolute",
  },
  nomPosition: {
    left: 0,
    position: "absolute",
  },
  passwordconfirmationLayout: {
    width: 306,
    position: "absolute",
  },
  inscription1: {
    fontSize: FontSize.size_lg,
    color: Color.midnightblue,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  inscription: {
    left: 69,
    top: 13,
    position: "absolute",
  },
  inscriptionbutton: {
    top: 388,
    left: 50,
    borderRadius: Border.br_31xl,
    backgroundColor: Color.darkturquoise,
    width: 228,
    height: 48,
    position: "absolute",
  },
  nom: {
    width: 86,
    left: 0,
    position: "absolute",
  },
  namefieldChild: {
    height: 1,
    width: 112,
    position: "absolute",
  },
  namefield: {
    height: 20,
    width: 112,
  },
  prenomfield: {
    marginLeft: 55,
    height: 20,
    width: 112,
  },
  nomprenom: {
    top: 26,
  },
  motDePasse: {
    width: 141,
    left: 0,
    position: "absolute",
  },
  passwordfieldChild: {
    height: 1,
    top: 19,
    left: 0,
  },
  passwordfield: {
    top: 155,
    height: 20,
    left: 11,
  },
  dateDeNaissance: {
    width: 150,
    left: 0,
    position: "absolute",
  },
  birthfieldChild: {
    top: 20,
    width: 138,
    height: 1,
  },
  birthfield: {
    width: 150,
    height: 20,
  },
  emailParent: {
    top: 0,
    left: 0,
    height: 20,
    width: 112,
  },
  emailinput: {
    marginLeft: 24,
    height: 20,
    width: 112,
  },
  birthmail: {
    top: 84,
    alignItems: "center",
  },
  passwordconfirmationChild: {
    height: 1,
    top: 19,
    left: 0,
  },
  confirmationDuMot: {
    width: 235,
    color: Color.white,
    fontSize: FontSize.size_base,
    top: 0,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
  },
  passwordconfirmation: {
    top: 227,
    height: 20,
    left: 11,
  },
  inscriptionform: {
    width: 327,
    height: 484,
    overflow: "hidden",
  },
});

export default FormContainer;
