import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  header: {
    justifyContent: "center",
    flex: 0.7,
  },
  title_main: {
    fontSize: 24,
  },
  title_extra: {
    fontSize: 14,
    fontWeight: "200",
  },
  content: {
    flex: 1,
  },
  content_2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otp: {
    width: 64,
    height: 100,
    backgroundColor: Colors.light_gray,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  otp_number: {
    borderBottomWidth: 4,
    borderBottomColor: Colors.light_gray_2,
    fontSize: 24,
    width: 18,
    padding: 2.5,
  },
  input_control: {
    padding: 10,
    backgroundColor: "#ebebeb",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input_text: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  input_icon: {
    fontSize: 26,
    marginRight: 10,
    opacity: 0.4,
  },
  footer: {
    flex: 0.3,
  },
  input_option: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button_submit: {
    backgroundColor: Colors.secondary,
    padding: 14,
    borderRadius: 10,
  },
  button_submit_text: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  register: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  register_text_1: {
    marginRight: 5,
  },
  register_text_2: {
    fontWeight: "600",
    color: Colors.secondary,
  },
});
