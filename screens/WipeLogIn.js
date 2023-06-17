
import { View, Image, StyleSheet, Pressable, Text, Touchable, TextInput } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import LoginFormContainer from "../components/LoginFormContainer";
import { Padding, FontSize, Color, FontFamily } from "../GlobalStyles";
import { Border } from "../GlobalStyles";
import { auth } from "../services/firebaseConfig";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
const WipeLogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])



  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }


  return (
    <View style={[styles.wipeLogIn, styles.iconLayout]}>
      <View style={[styles.connexiontitre, styles.connexiontitreFlexBox]}>
        <Text style={styles.connexion}>Connexion</Text>
      </View>
    <View style={styles.connexionframe}>
      <View style={styles.mdpfieldLayout}>
        <TextInput style={[styles.nomDutilisateurOu, styles.connexion1Typo]}>
           Email
        </TextInput>
      </View>
      <View style={[styles.mdpfield, styles.mdpfieldLayout]}>
        <TextInput style={[styles.nomDutilisateurOu, styles.connexion1Typo]}>
          Mot de passe
        </TextInput>
      </View>
      <Pressable>
      <Text style={[styles.motDePasse1, styles.connexion1Typo]}>
        Mot de passe oublié ?
      </Text>
      </Pressable>
      <View style={styles.connexionbutton}>
        <Pressable
          style={styles.connexion}
          onPress={handleLogin}
        >
          <Text style={[styles.connexion1, styles.connexion1Typo]}>
            Connexion
          </Text>
        </Pressable>
      </View>
    </View>
    <Pressable onPress={navigation.navigate('WipeSignUp')}>
      <Text style={styles.inscrivezVousSiContainer}>
        <Text style={styles.inscrivezVous}>Inscrivez vous</Text>
        <Text style={styles.siVousNavez}> Si vous n’avez pas de compte</Text>
      </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  connexion1Typo: {
    textAlign: "left",
    
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
    
  },
  connexion1: {
    fontSize: FontSize.size_lg,
    color: Color.midnightblue,
    textAlign: "left",
    
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
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  connexiontitreFlexBox: {
    flexDirection: "row",
    marginTop: 18,
    overflow: "hidden",
  },
  icon: {
    height: "100%",
  },
  iconchevron: {
    width: 24,
    height: 24,
  },
  iconchevronWrapper: {
    alignSelf: "stretch",
    height: 57,
    paddingHorizontal: Padding.p_4xs,
    paddingVertical: 0,
    marginTop: 18,
  },
  connexion: {
    fontSize: FontSize.size_13xl,
    textAlign: "left",
    color: Color.white,
    
  },
  connexiontitre: {
    width: 375,
    height: 191,
    justifyContent: "center",
    marginTop: 18,
    alignItems: "center",
  },
  inscrivezVous: {
    color: Color.white,
  },
  siVousNavez: {
    color: "#626262",
  },
  inscrivezVousSiContainer: {
    fontSize: FontSize.caption10SemiBold_size,
    textAlign: "center",
    width: 244,
    height: 45,
    
    marginTop: 18,
  },
  wipeLogIn: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    paddingBottom: 119,
    alignItems: "center",
  },
});

export default WipeLogIn;
