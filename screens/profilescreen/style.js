import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  timestamp: {
    top: 40,
    left: 0,
    alignItems: "center",
  },
  timestamp_text: {
    fontWeight: "800",
    fontSize: 18,
    color: Colors.darker,
  },
  container: {
    backgroundColor: "#FFFFFF",
    marginTop: 120,
    marginLeft: -screenWidth / 2,
    borderRadius: screenWidth,
    height: screenHeight * 2,
    width: screenWidth * 2,
  },
  changePhoto: {
    position: "absolute",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 80,
  },
  daily_kcal_left: {
    width: 160,
    height: 160,
    position: "absolute",
    top: -60,
    left: screenWidth - 80,
    borderRadius: 80,
  },
  avatar: {
    borderRadius: 80,
    width: 160,
    height: 160,
    backgroundColor: Colors.dark,
  },
  content: {
    width: screenWidth,
    marginLeft: screenWidth / 2,
    marginTop: 100,
  },
  content_row: {
    width: screenWidth - 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 20,
  },
  content_row_edit: {
    backgroundColor: Colors.light_gray,
    width: screenWidth - 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  text_input: {
    fontSize: 16,
    textAlign: "center",
  },
  text_input_edit: {
    fontSize: 16,
  },
  edit: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    opacity: 0.75,
  },
  save: {
    position: "absolute",
    top: 35,
    left: 20,
    padding: 8,
    borderRadius: 20,
    fontSize: 18,
  },
});
