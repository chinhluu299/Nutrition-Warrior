import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    margin: 25,
    padding: 5,
    paddingLeft: 15,
    top: 20,
    borderColor: Colors.dark,
    borderWidth: 1.5,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
  },
  search_input: {
    marginStart: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.darker,
  },
  result: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    top: 30,
    width: width,
    height: 50,
    justifyContent: "center",
  },
  back_control: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(235,235,235,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 0,
    left: width / 20,
    borderWidth: 0,
  },
  back_control_icon: {
    fontSize: 20,
    fontWeight: "800",
  },
  result_data: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  result_overview: {
    display: "flex",
    flexDirection: "row",
  },
  number_result: {
    fontWeight: "bold",
    marginRight: 20,
  },
  hint_keyword: {
    marginLeft: 5,
    marginRight: 10,
    borderRadius: 25,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#DEDEDE",
  },
  food_container: {
    // flex: 1,
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  food_image: {
    width: 200,
    height: 200,
  },
  food_label: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  food_nutrient: {
    width: (width * 4) / 5,
  },
});
