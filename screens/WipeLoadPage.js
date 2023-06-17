import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const WipeLoadPage = () => {
  return (
    <View style={[styles.wipeLoadPage, styles.logosectionFlexBox]}>
      <View style={[styles.logosection, styles.logosectionFlexBox]}>
        <Text style={styles.wipe}>Wipe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logosectionFlexBox: {
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
    overflow: "hidden",
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_16xl,
  },
  wipeLoadPage: {
    backgroundColor: Color.midnightblue,
    flex: 1,
    width: "100%",
    height: 812,
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 281,
  },
});

export default WipeLoadPage;
