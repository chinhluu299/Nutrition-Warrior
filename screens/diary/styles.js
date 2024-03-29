import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  setContainer: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  setInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighter,
  },

  foodLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  foodDetails: {
    fontSize: 14,
    color: Colors.dark,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  exerciseItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exerciseDetail: {
    fontSize: 16,
    marginBottom: 8,
  },
  setContainer: {
    marginTop: 8,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  noExercisesText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  exerciseItem: {
    padding: 10,
    backgroundColor: Colors.lighter,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 20,
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
