import * as React from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const ScrollViewCircles = ({circles}) => {
  const navigation = useNavigation();



  const navigateToCircleDetails = (circleId) => {
    navigation.navigate('CircleDetails', { circleId });
  };

  return (
    <ScrollView
      style={styles.listviewcercles}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listViewCerclesScrollViewContent}
    >
      <FlatList
        data={circles}
        renderItem={({ item }) => (
          <CircleItem
            circle={item}
            onPress={() => navigateToCircleDetails(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listViewCerclesScrollViewContent: {
    flexDirection: "column",
    paddingRight: 14,
  },
  modifierTypo: {
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  nomphotos3premiersuserChild: {
    width: 145,
    height: 55,
  },
  lesTroisMousquetaires: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    textAlign: "left",
    width: 152,
    height: 13,
    marginTop: 4,
  },
  nomphotos3premiersuser: {
    alignItems: "center",
  },
  modifier: {
    fontSize: FontSize.size_smi,
    color: Color.gray_100,
    textAlign: "center",
    width: 72,
  },
  buttonmodifier: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_7xs,
    paddingVertical: Padding.p_10xs,
    alignItems: "center",
  },
  buttonmodifsection: {
    alignItems: "flex-end",
    flex: 1,
  },
  cercleitem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  listviewcercles: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default ScrollViewCircles;
