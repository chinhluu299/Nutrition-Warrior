import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background_title_text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 30,
    color: Colors.darker,
    fontWeight: "700",
  },
  list: {
    flex: 1,
  },
  circle_1: {
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: -width + 100,
    right: width / 2,
    zIndex: -1,
  },
  circle_2: {
    width: 200,
    height: 200,
    borderRadius: 100,
    top: height / 2,
    left: width / 2 + 100,
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: -1,
  },
  circle_3: {
    width: 300,
    height: 300,
    borderRadius: 150,
    bottom: -100,
    left: -100,
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: -1,
  },
});
