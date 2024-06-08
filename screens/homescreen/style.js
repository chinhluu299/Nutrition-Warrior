import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: Colors.primary,
    //backgroundColor: "#19EA83",
    backgroundColor: "gray",
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
  daily_kcal_left: {
    width: 160,
    height: 160,
    position: "absolute",
    top: -60,
    left: screenWidth - 80,
    borderRadius: 80,
  },
  content: {
    width: screenWidth,
    marginLeft: screenWidth / 2,
    marginTop: 100,
  },
  daily_kcal_left_detail: {
    flexDirection: "row",
    width: screenWidth - 40,
    margin: 20,
  },
  daily_action: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth - 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  daily_action_item: {
    width: (screenWidth - 60) / 2,
    height: (screenWidth - 60) / 2,
    backgroundColor: Colors.background,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  daily_action_text: {
    marginTop: 15,
    fontWeight: "700",
    color: Colors.text,
    opacity: 0.75,
  },
  daily_pick: {
    margin: 20,
    width: screenWidth - 40,
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
});
