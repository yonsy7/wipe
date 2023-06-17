import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const CircleItem = ({ circle }) => {
  return (
    <View>
    <View style={styles.cardContainer}>
      <View style={styles.photoContainer}>
        {circle.lastThreeMembers?.map((member, index) => (
          member.profilePhoto ? (
            <Image key={index} source={{ uri: member.profilePhoto }} style={styles.photo}/>
          ) : (
            <View key={index} style={styles.defaultPhoto}/>
          )
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.circleName}>{circle.name}</Text>
      </View>
      <MaterialIcons name="edit" size={24} color={Color.gray_200} style={styles.editButton}/>

    </View>
    <View style={{backgroundColor:"white", flex:1, height:0.5}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    
    borderRadius: Border.br_31xl,
    padding: Padding.p_7xs,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  defaultPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    backgroundColor: Color.gray,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent:'center',
  },
  circleName: {
    fontSize: 18,
     // change the size to medium
    color: "white",
    fontWeight:'semi-bold',
    
  },
  editButton: {
    alignSelf: "flex-end",
    color:"white",
  },
});

export default CircleItem;
