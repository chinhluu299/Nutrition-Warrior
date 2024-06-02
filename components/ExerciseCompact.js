import React from "react";
import { StyleSheet, TouchableOpacity, Image, Touchable } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ExerciseCompact = ({ image, title, sets, press }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <View style={styles.image_container}>
        <Image style={styles.image} source={image} resizeMode="cover" />
      </View>
      <View style={styles.title_container}>
        <Text style={styles.title_1}>{title}</Text>
        <Text style={styles.title_2}>{sets.length} Sets</Text>
        <View style={styles.title_3}>
          <FontAwesome5 style={styles.title_3_item} name="dumbbell" />
          <Text style={styles.title_3_item}>
            {sets.reduce((sum, value) => {
              return sum + value.reps;
            }, 0)}
          </Text>
          <FontAwesome5 name="clock" style={styles.title_3_item} />
          <Text style={styles.title_3_item}>
            {sets.reduce((sum, value) => {
              return sum + value.duration;
            }, 0)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 100,
    //backgroundColor: Colors.background,
    margin: 10,
    overflow: "hidden",
    //backgroundColor:"#FFF"
    //borderRadius: 16,
    //justifyContent: "center",
    //alignItems: "center",
  },
  image_container: {
    borderRadius: 16,
    width: 80,
    height: 80,
    overflow: "hidden",
  },
  image: {
    //width: "100%",
    height: 80,
    width: 80,
    borderRadius: 16,
  },
  title_container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  title_1: {
    position: "absolute",
    top: 0,
    left: 95,
    opacity: 0.8,
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
    borderRadius: 20,
    flexWrap: "wrap",
  },
  title_2: {
    position: "absolute",
    top: 30,
    left: 95,
    color: Colors.darker,
    opacity: 0.9,
    fontSize: 16,
    fontWeight: "400",
    textTransform: "capitalize",
  },
  title_3: {
    position: "absolute",
    top: 60,
    left: 95,
    color: Colors.darker,
    opacity: 0.9,
    display:'flex',
    flexDirection:'row',
    textTransform: "capitalize",
    alignItems:'center'
  },
  title_3_item:{
    marginEnd: 10,
    fontSize: 16
  }
});

export default ExerciseCompact;
