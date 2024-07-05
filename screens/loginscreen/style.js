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
    // textAlign: "center",
  },
  title_extra: {
    fontSize: 14,
    // textAlign: "center",
    fontWeight: "200",
  },
  content: {
    flex: 1,
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
  input_remember_me: {
    flexDirection: "row",
  },
  text_remember_me: {
    marginLeft: 10,
    fontSize: 12,
  },
  checkbox_remmeber_me: {
    width: 16,
    height: 16,
  },
  text_forgot_password: {
    fontSize: 12,
    color: Colors.primary_2,
    fontWeight: "500",
  },
  button_submit: {
    backgroundColor: Colors.primary_2,
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
    color: Colors.primary_2,
  },
});
