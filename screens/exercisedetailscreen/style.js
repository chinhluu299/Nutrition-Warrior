import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db", 
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, 
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  image_container: {
    height: 300,
    marginBottom: 10,
    overflow: "hidden",
    //borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // top: 0,
    // left: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  content_info: {
    flexDirection: "row",
    marginBottom: 6,
  },
  content_info_title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },
  content_info_value: {
    fontSize: 16,
    marginLeft: 10,
    textTransform: "capitalize",
    flexShrink: 1,
  },
  instructions_step: {
    flexDirection: "row",
    marginTop: 6,
  },
  instructions_step_num: {
    color: Colors.primary,
    fontWeight: "400",
  },
  instructions_step_value: {
    color: Colors.darker,
    fontWeight: "400",
    flexShrink: 1,
  },
});
