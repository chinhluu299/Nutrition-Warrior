import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    color: "white", // Set your desired icon color
    fontSize: 24, // Set your desired icon size
    color: Colors.darker,
    fontWeight: "800",
  },
  sectionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.darker,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12, // Adjusted padding
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
