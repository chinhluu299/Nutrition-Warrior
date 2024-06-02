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
    textTransform: "capitalize",
  },
  list: {
    flex: 1,
  },
  back_control: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 50,
    left: 20,
    borderWidth: 0,
  },
  back_control_icon: {
    fontSize: 20,
    fontWeight: "800",
    
  },
});
