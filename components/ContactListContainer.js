import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const ContactListContainer = () => {
  return (
    <View style={[styles.listiewcontactsajouter, styles.matthieuPosition]}>
      <View style={styles.contactitems}>
        <View style={styles.infodemandeur}>
          <View style={styles.infodemandeur}>
            <Image
              style={styles.frameChild}
              resizeMode="cover"
              source={require("../assets/ellipse-12.png")}
            />
          </View>
          <View style={styles.nompseudo}>
            <Text style={[styles.matthieu, styles.ajouterTypo]}>Matthieu</Text>
            <Text style={[styles.mattlamenace, styles.ajouterTypo]}>
              @Mattlamenace
            </Text>
          </View>
        </View>
        <View style={styles.boutonajouterWrapper}>
          <View style={styles.boutonajouter}>
            <Text style={[styles.ajouter, styles.ajouterTypo]}>Ajouter</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matthieuPosition: {
    left: 0,
    position: "absolute",
  },
  ajouterTypo: {
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  frameChild: {
    width: 34,
    height: 34,
  },
  infodemandeur: {
    flexDirection: "row",
  },
  matthieu: {
    top: 0,
    fontSize: FontSize.size_sm,
    color: Color.white,
    width: 72,
    left: 0,
    position: "absolute",
  },
  mattlamenace: {
    top: 17,
    fontSize: FontSize.size_xs,
    color: Color.grey,
    height: 14,
    width: 84,
    left: 0,
    position: "absolute",
  },
  nompseudo: {
    height: 31,
    marginLeft: 5,
    width: 84,
  },
  ajouter: {
    fontSize: FontSize.size_smi,
    color: Color.gray_100,
  },
  boutonajouter: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_lg,
    paddingVertical: Padding.p_11xs,
    flexDirection: "row",
  },
  boutonajouterWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 75,
  },
  contactitems: {
    width: 374,
    alignItems: "center",
    flexDirection: "row",
  },
  listiewcontactsajouter: {
    top: 495,
    height: 164,
  },
});

export default ContactListContainer;
