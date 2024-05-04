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
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    borderRadius: 50,
    width: 60,
    height: 60,
    padding: 15,
    borderWidth: 5,
    borderColor: "white",
  },
  uploadButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    borderRadius: 50,
  },
  controls: {
    position: "relative",
    display: "block",
    left: 0,
    top: 50,
    width: width,
    height: 80,
    justifyContent: "center",
  },
  back_control: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(241,241,241,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 20,
    left: width / 12,
    borderWidth: 0,
  },
  back_control_icon: {
    fontSize: 20,
    fontWeight: "800",
  },
  info_control: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(241,241,241,0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 20,
    right: width / 10,
    borderWidth: 0,
  },
  info_control_icon: {
    fontSize: 20,
    fontWeight: "800",
  },
  text_container: {
    position: "absolute",
    top: height / 2,
    left: width / 12,
    maxWidth: (width * 5) / 6,
    justifyContent: "center",
    alignItems: "center",
    width: (width * 5) / 6,
  },
  text: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "black",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
  },
});
