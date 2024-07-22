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
    fontSize: 22,
    width: width - 40,
    lineHeight: 50,
    textAlign: "center",
    //fontFamily: "Inter-SemiBold",
  },
  heading_name: {
    fontSize: 30,
    width: width - 40,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    color: Colors.primary,
  },
  text_input: {
    fontSize: 30,
    width: width / 2,
    padding: 5,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    color: Colors.primary,
    backgroundColor: Colors.light_gray,
  },
  description: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  button_next: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    bottom: 20,
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
    color: "#FFF",
  },
});
