import { Image, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import ScrollViewCircles from "../components/ScrollViewCircles";
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CircleItem from "../components/CircleItem";
import { getCirclesByUser, createCircle, deleteCircle } from '../services/circles';


import { auth } from "../services/firebaseConfig";const WipeCirclesPage = () => {
  const [circles, setCircles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCircles = async () => {
      setIsLoading(true);  // Start loading
        const fetchedCircles = await getCirclesByUser(auth.currentUser?.uid);
        if (fetchedCircles) {
          setCircles(fetchedCircles);
        } else {
          
        }
      setIsLoading(false);  // Stop loading
    };
    fetchCircles();
  }, []);


  const onCreateCircle = async () => {
    const newCircle = await createCircle();
    setCircles([...circles, newCircle]);
  };

  const onDeleteCircle = async (circleId) => {
    await deleteCircle(circleId);
    setCircles(circles.filter((circle) => circle.id !== circleId));
  };

  const navigateToFriends = () => {
    navigation.navigate('Friends');
  };

  const navigateToCircleDetails = (circleId) => {
    navigation.navigate('CircleDetails', { circleId });
  };
  
  
  return (
    <View style={styles.wipeCirclesPage}>
      
      <SystemContainer timeAlignSelf="unset" timeWidth={375} />

      <View style={styles.iconchevronParent}>
        <Pressable
          style={styles.iconchevron}
          onPress={() => navigation.navigate("WipeAddFriends")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/iconchevron.png")}
          />
        </Pressable>

        
        <Pressable
          style={styles.modifierVosCerclesContainer}
          onPress={() => navigation.navigate("WipeHomePage")}
        >
          <Text style={[styles.modifierVosCercles, styles.crerUnCercleTypo]}>
            Modifier vos cercles
          </Text>
        </Pressable>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
      <View style={[styles.viewcercle, styles.viewcercleFlexBox]}>
        <ScrollViewCircles />
        <View style={styles.sectionbuttoncreeruncercle}>
          <View style={styles.buttoncreercercle}>
            <Text style={[styles.crerUnCercle, styles.crerUnCercleTypo]}>
              Créer un cercle
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.wipeCirclesPageInner, styles.viewcercleFlexBox]}>
        <View style={[styles.frameParent, styles.frameParentBg]}>
          <Pressable style={styles.amisWrapper}>
            <Pressable onPress={() => navigation.navigate("WipeAddFriends")}>
              <Text style={styles.amis1Typo}>Amis</Text>
            </Pressable>
          </Pressable>
          <Pressable style={[styles.buttoncercle, styles.frameParentBg]}>
            <Text style={styles.amis1Typo}>Cercles</Text>
          </Pressable>
        </View>
      </View>
      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  crerUnCercleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  viewcercleFlexBox: {
    alignSelf: "stretch",
    marginTop: 17,
    alignItems: "center",
  },
  frameParentBg: {
    backgroundColor: Color.darkslateblue,
    borderRadius: Border.br_31xl,
    overflow: "hidden",
    flexDirection: "row",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  iconchevron: {
    width: 24,
    height: 24,
  },
  modifierVosCercles: {
    fontSize: FontSize.size_xl,
    width: 194,
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  modifierVosCerclesContainer: {
    marginLeft: 3,
  },
  iconchevronParent: {
    width: 375,
    marginTop: 17,
    flexDirection: "row",
  },
  crerUnCercle: {
    fontSize: FontSize.size_smi,
    color: Color.gray_100,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  buttoncreercercle: {
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_4xs,
    paddingVertical: Padding.p_10xs,
    borderRadius: Border.br_31xl,
    overflow: "hidden",
    flexDirection: "row",
  },
  sectionbuttoncreeruncercle: {
    width: 307,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_2xs,
    alignItems: "center",
  },
  viewcercle: {
    flex: 1,
    alignSelf: "stretch",
  },
  amis1Typo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
  },
  amisWrapper: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: 0,
    flexDirection: "row",
  },
  buttoncercle: {
    paddingHorizontal: Padding.p_5xs,
    marginLeft: 27,
    paddingVertical: Padding.p_10xs,
  },
  frameParent: {
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: Padding.p_8xs,
    alignItems: "center",
  },
  wipeCirclesPageInner: {
    height: 63,
    justifyContent: "center",
  },
  wipeCirclesPage: {
    backgroundColor: Color.midnightblue,
    height: 807,
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});

export default WipeCirclesPage;
