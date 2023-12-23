import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ActivityIndicatorLoadingPage = ({ isBusy, type }) => {
  return (
    isBusy &&
    (type == 1 ? (
      <View style={[styles.container]}>
        <View style={styles.background}></View>
        <ActivityIndicator
          size="larger"
          color={Colors.secondary}
          animating={isBusy}
          fontSize="20"
        />
      </View>
    ) : (
      <View style={[styles.container]}>
        <View style={styles.background_2}></View>
        <ActivityIndicator
          size="larger"
          color={Colors.secondary}
          animating={isBusy}
          fontSize="20"
        />
      </View>
    ))
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "black",
    opacity: 0.75,
  },
  background_2: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#FFF",
  },
});

export default ActivityIndicatorLoadingPage;
