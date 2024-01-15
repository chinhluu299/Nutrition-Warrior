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
});
