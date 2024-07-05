import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
    textTransform: "capitalize",
  },
  content: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.5,
    borderRadius: 20,
  },
  title: {
    marginTop: 15,
    width: screenWidth * 0.9,
  },
  title_text: {
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
  },

  options: {
    width: 0.9 * screenWidth,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  options_item: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: "center",
    borderRadius: 15,
    color: "rgb(185,186,190)",
    fontWeight: "600",
  },
  options_item_selected: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: "center",
    borderRadius: 12,
    backgroundColor: Colors.primary,
    color: "#FFF",
    fontWeight: "600",
  },
  options_description: {
    width: screenWidth * 0.9,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(185,186,190)",
    height: screenHeight * 0.45,
  },
  options_description_text: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  recipeForText:{
    
  }
});