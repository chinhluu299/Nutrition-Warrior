import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image_background: {
    flex: 1,
    width: width,
    top: height / 10,
  },
  content: {
    flex: 1,
    top: height / 10,
    alignItems: "center",
  },
  heading: {
    marginTop: 30,
    fontSize: 38,
    width: 300,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  heading_name: {
    marginTop: 10,
    fontSize: 38,
    width: 400,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  button_next: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    bottom: height / 15,
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  text_next: {
    fontWeight: "700",
    fontFamily: "Inter-Black",
  },
});
