import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";
import { red } from "react-native-redash";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  control: {
    top: height / 12,
    left: width / 20,
    width: (width * 9) / 10,
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    height: 60,
  },
  icon: {
    padding: 16,
    fontSize: 18,
    backgroundColor: "black",
    borderRadius: 50,
    color: "white",
  },
  content: {
    flex: 1,
    top: 60,
  },
  
  content_comment: {
    position: "absolute",
    bottom: 60,
    height: 80,
    paddingTop: 10,
    backgroundColor: "#FFF",
    width: width,
  },
  content_comment_input: {
    width: (width * 5) / 6,
    height: 50,
    left: width / 12,
    borderRadius: 50,
    padding: 10,
    paddingLeft: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  content_comment_icon: {
    top: 22,
    left: (width * 11) / 12 - 40,
    fontSize: 20,
    position: "absolute",
  },
});
