import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.primary,
    // backgroundColor: "lightgray",
  },
  timestamp: {
    top: 40,
    left: 0,
    alignItems: "center",
  },
  timestamp_text: {
    fontWeight: "800",
    fontSize: 18,
    color: Colors.primary_3,
  },
  container: {
    backgroundColor: "#FFFFFF",
    //backgroundColor: "lightgray",
    marginTop: 120,
    marginLeft: -screenWidth / 2,
    borderRadius: screenWidth,
    height: screenHeight * 2,
    width: screenWidth * 2,
  },
  changePhoto: {
    position: "absolute",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 80,
  },
  daily_kcal_left: {
    width: 160,
    height: 160,
    position: "absolute",
    top: -60,
    left: screenWidth - 80,
    borderRadius: 80,
  },
  avatar: {
    borderRadius: 80,
    width: 160,
    height: 160,
    backgroundColor: Colors.dark,
  },
  content: {
    marginTop: 120,
    height: "100%",
    //backgroundColor:"gray"
    width: screenWidth,
    marginLeft: screenWidth / 2,
  },
  profile: {
    // backgroundColor: Colors.background,
    backgroundColor: Colors.third,
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  button_change: {
    padding: 10,
    margin: 5,
    backgroundColor: Colors.primary_2,
    borderRadius: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },

  content_row: {
    // width: screenWidth - 40,
    // marginLeft: 20,
    // marginRight: 20,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop: 20,
  },
  text_input_title: {
    verticalAlign: "middle",
    fontSize: 16,
  },
  content_row_edit: {
    backgroundColor: Colors.light_gray,
    width: screenWidth - 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    paddingLeft: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  text_input: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    color: "#000",
  },
  text_input_edit: {
    fontSize: 16,
  },
  edit: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    opacity: 0.75,
  },
  edit: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    opacity: 0.75,
  },
  logout: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    opacity: 0.75,
  },
  save: {
    position: "absolute",
    top: 35,
    left: 20,
    padding: 8,
    borderRadius: 20,
    fontSize: 18,
  },
  content_another: {
    top: 20,
    left: 20,
    width: screenWidth - 40,
  },
  content_another_card: {
    // backgroundColor: Colors.background,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 15,
  },
  content_another_card_wh: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content_another_card_wh_text: {
    padding: 5,
    fontSize: 16,
    color: Colors.primary_3,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  bmi_text: {
    padding: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  button_change_text: {
    textAlign: "center",
    fontWeight: "600",
    color: "#FFF",
  },
});
