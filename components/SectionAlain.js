import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";

const SectionAlain = () => {
  return (
    <View style={[styles.divider1pxParent, styles.alainPosition]}>
      <View style={styles.divider1px}>
        <View style={styles.divider} />
      </View>
      <View style={styles.listviewajoutamis}>
        <View style={styles.itemajouteruser}>
          <View style={styles.pdfinfo}>
            <Image
              style={styles.pdfajouteurIcon}
              resizeMode="cover"
              source={require("../assets/pdfajouteur.png")}
            />
            <View style={styles.infoajouteur}>
              <Text style={[styles.alain, styles.alainTypo]}>Alain</Text>
              <Text style={[styles.alino, styles.alainTypo]}>@Alino</Text>
            </View>
          </View>
          <View style={styles.buttonajouterWrapper}>
            <View style={styles.buttonajouter}>
              <Text style={[styles.accepter, styles.alainTypo]}>Accepter</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.divider1px}>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alainPosition: {
    left: 0,
    position: "absolute",
  },
  alainTypo: {
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  divider: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.darkGrey,
    position: "absolute",
  },
  divider1px: {
    width: 302,
    height: 1,
  },
  pdfajouteurIcon: {
    width: 34,
    height: 34,
  },
  alain: {
    top: 0,
    fontSize: FontSize.size_sm,
    color: Color.white,
    width: 72,
    left: 0,
    position: "absolute",
  },
  alino: {
    top: 17,
    fontSize: FontSize.size_xs,
    color: Color.grey,
    width: 67,
    height: 14,
    left: 0,
    position: "absolute",
  },
  infoajouteur: {
    height: 31,
    marginLeft: 5,
    width: 72,
  },
  pdfinfo: {
    flexDirection: "row",
  },
  accepter: {
    fontSize: FontSize.size_smi,
    color: Color.gray_100,
  },
  buttonajouter: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_smi,
    paddingVertical: Padding.p_11xs,
    flexDirection: "row",
  },
  buttonajouterWrapper: {
    flex: 1,
    height: 51,
    paddingRight: Padding.p_5xs,
    marginLeft: 94,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  itemajouteruser: {
    borderStyle: "solid",
    borderColor: "#1e1e1e",
    borderWidth: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  listviewajoutamis: {
    borderRadius: Border.br_smi,
    backgroundColor: Color.darkslateblue,
    height: 168,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  divider1pxParent: {
    top: 295,
    width: 375,
    paddingHorizontal: Padding.p_2xl,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SectionAlain;
