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
  image_captured: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: width,
  },
  camera: {
    flex: 1,
    // backgroundColor: "black",
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
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.4)",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  controls: {
    position: "relative",
    display: "block",
    left: 0,
    top: 50,
    width: width,
    height: 80,
    justifyContent: "center",
    zIndex: 1000,
  },
  controls_2: {
    position: "absolute",
    left: 0,
    top: 50,
    width: width,
    height: 80,
    justifyContent: "center",
    zIndex: 1000,
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
    zIndex: 1000,
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
    zIndex: 1000,
  },
  text: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "#FFF",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
  },
});
