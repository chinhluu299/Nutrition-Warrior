import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_title: {
    height: width + 500,
    width: width + 500,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: width + 400,
    marginStart: -250,
    marginTop: -width - 380,
    backgroundColor: Colors.primary,
    borderRadius: (width + 500) / 2,
  },
  background_title_text: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: Colors.text_white,
  },
  timestamp_scroll: {
    width: width,
    height: 60,
  },
  timestamp: {
    marginTop: 10,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  timestamp_element: {
    paddingLeft: 20,
    paddingEnd: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: 40,
    backgroundColor: "#F5F3F5",
    //backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  timestamp_element_active: {
    backgroundColor: Colors.primary,
    
  },
  timestamp_text: {
    fontFamily: "Inter-Bold",
  },
});
