import React from "react";
import { StyleSheet, TouchableOpacity, Image, Touchable } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ExerciseCollectionItem = ({ image, title, press, type }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <Image style={styles.image} source={image} resizeMode="cover" />
      <View style={styles.title_container}>
        <Text style={type == 2 ? styles.title_2 : styles.title_1}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 160,
    backgroundColor: Colors.background,
    margin: 10,
    overflow: "hidden",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title_container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  title_1: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: Colors.primary,
    opacity: 0.8,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
    // backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  title_2: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    color: Colors.darker,
    opacity: 0.9,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default ExerciseCollectionItem;
