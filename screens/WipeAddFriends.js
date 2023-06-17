import { Image, StyleSheet, Pressable, View, Text } from "react-native";
import SystemContainer from "../components/SystemContainer";
import { useNavigation } from "@react-navigation/native";
import SectionAlain from "../components/SectionAlain";
import ContactListContainer from "../components/ContactListContainer";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Camera } from 'expo-camera';
import { searchUsers, getFriendRequests, acceptFriendRequest, rejectFriendRequest, addFriend } from '../services/friends';



const WipeAddFriends = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [cameraVisible, setCameraVisible] = useState(false);


  useEffect(() => {
    const fetchFriendRequests = async () => {
      const requests = await getFriendRequests();
      setFriendRequests(requests);
    };

    fetchFriendRequests();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    const results = await searchUsers(text);
    setSearchResults(results);
  };

  const handleAcceptRequest = async (requestId) => {
    await acceptFriendRequest(requestId);
    // Update friendRequests state
  };

  const handleRejectRequest = async (requestId) => {
    await rejectFriendRequest(requestId);
    // Update friendRequests state
  };

  const handleAddFriend = async (userId) => {
    await addFriend(userId);
    // Update UI if needed
  };

  const toggleCamera = () => {
    setCameraVisible(!cameraVisible);
  };

  const handleQRCodeScanned = async ({ data }) => {
    await addFriend(data);
    toggleCamera();
  };

  return (
    <View style={styles.wipeAddFriends}>
      <SystemContainer timeAlignSelf="unset" timeWidth={375} />
      <View style={styles.viewamis}>
        <View style={[styles.iconchevronWrapper, styles.wrapperPosition]}>
          <Pressable
            style={styles.iconchevron}
            onPress={() => navigation.navigate("WipeHomePage")}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/iconchevron.png")}
            />
          </Pressable>
        </View>
        <View style={[styles.frameParent, styles.frameParentFlexBox]}>
          <View style={styles.iconsearchWrapper}>
            <Image
              style={styles.iconsearch}
              resizeMode="cover"
              source={require("../assets/iconsearch.png")}
            />
            <TextInput
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Rechercher un utilisateur"
      />
          </View>
          <View style={styles.cameraWrapper}>
          <TouchableOpacity onPress={toggleCamera}>
            <Image
              style={styles.cameraIcon}
              resizeMode="cover"
              source={require("../assets/camera.png")}
            />
            </TouchableOpacity>
            
          </View>
        </View>
        {cameraVisible && (
        <Camera
          style={{ width: 200, height: 200 }}
          onBarCodeScanned={handleQRCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [Camera.Constants.BarCodeType.qr],
          }}
        />
      )}
        <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleAddFriend(item.id)}>
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
        <Text style={styles.ajouterDesAmis}>Ajouter des amis</Text>
        <View style={[styles.viewamisInner, styles.wrapperPosition]}>
          <View style={styles.groupChildLayout}>
          <QRCode value="YOUR_USER_ID" size={200} />
            <Image
              style={[styles.groupChild, styles.groupChildLayout]}
              resizeMode="cover"
              source={require("../assets/rectangle-21.png")}
            />
          </View>
        </View>
        <View
          style={[styles.ilsVeulentTajouterWrapper, styles.wrapperPosition]}
        >
          <Text style={styles.amisTypo}>Ils veulent t’ajouter</Text>
        </View>
        
        <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            <TouchableOpacity onPress={() => handleAcceptRequest(item.id)}>
              <Text>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRejectRequest(item.id)}>
              <Text>Rejeter</Text>
              </TouchableOpacity>
            </View>

        )}
        keyExtractor={(item) => item.id}
      />
        <SectionAlain />
        <View style={[styles.ajouteTesContactsWrapper, styles.wrapperPosition]}>
          <Text style={styles.amisTypo}>Ajoute tes contacts</Text>
        </View>
        <ContactListContainer />
      </View>
      <View style={[styles.wipeAddFriendsInner, styles.frameParentFlexBox]}>
        <View style={styles.frameChildLayout}>
          <View style={[styles.frameChild, styles.frameLayout]} />
          <Text style={[styles.amis, styles.amisPosition]}>Amis</Text>
          <Pressable
            style={[styles.cercles, styles.amisPosition]}
            onPress={() => navigation.navigate("WipeCirclesPage")}
          >
            <Text style={[styles.cercles1, styles.amisTypo]}>Cercles</Text>
          </Pressable>
          <View style={[styles.frameItem, styles.frameLayout]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperPosition: {
    flexDirection: "row",
    left: 0,
    position: "absolute",
  },
  frameParentFlexBox: {
    alignItems: "center",
    width: 375,
  },
  groupChildLayout: {
    height: 166,
    width: 166,
  },
  frameLayout: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.darkslateblue,
    position: "absolute",
  },
  amisPosition: {
    top: 8,
    position: "absolute",
  },
  amisTypo: {
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
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
  iconchevronWrapper: {
    top: 0,
    flexDirection: "row",
    width: 375,
  },
  iconsearch: {
    width: 16,
    height: 15,
    overflow: "hidden",
  },
  iconsearchWrapper: {
    borderRadius: 6,
    width: 302,
    height: 39,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_5xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.darkslateblue,
    alignItems: "center",
    flexDirection: "row",
  },
  cameraIcon: {
    width: 22,
    height: 21,
    overflow: "hidden",
  },
  cameraWrapper: {
    alignItems: "flex-end",
    marginLeft: 15,
    flex: 1,
  },
  frameParent: {
    top: 30,
    flexDirection: "row",
    left: 0,
    position: "absolute",
  },
  ajouterDesAmis: {
    top: 75,
    color: Color.grey,
    width: 293,
    height: 18,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  groupChild: {
    borderRadius: 15,
    left: 0,
    top: 0,
    position: "absolute",
    width: 166,
  },
  viewamisInner: {
    top: 99,
    width: 361,
    justifyContent: "center",
  },
  ilsVeulentTajouterWrapper: {
    top: 271,
  },
  ajouteTesContactsWrapper: {
    top: 471,
  },
  viewamis: {
    height: 659,
    marginTop: 6,
    width: 375,
  },
  frameChild: {
    height: 34,
    width: 153,
    left: 0,
    top: 0,
  },
  amis: {
    left: 31,
    width: 42,
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
  },
  cercles1: {
    width: 50,
  },
  cercles: {
    left: 92,
  },
  frameItem: {
    top: 4,
    left: 13,
    width: 64,
    height: 26,
  },
  frameChildLayout: {
    height: 34,
    width: 153,
  },
  wipeAddFriendsInner: {
    height: 50,
    justifyContent: "center",
    marginTop: 6,
  },
  wipeAddFriends: {
    backgroundColor: Color.midnightblue,
    height: 765,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: 0,
    width: "100%",
    flex: 1,
  },
});

export default WipeAddFriends;
