import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  tableHeader: {
    height: 40,
    backgroundColor: Colors.third,
  },

  tableHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
  },

  tableRowText: {
    textAlign: "center",
  },
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
    marginVertical: 2,
    //borderBottomWidth: 1,
    //borderBottomColor: Colors.lighter,
  },

  foodLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.dark,
    alignSelf:'center',
    marginLeft: 10,
  },

  foodDetails: {
    fontSize: 14,
    color: Colors.dark,
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
    marginHorizontal: 20,
    marginTop: 40,
  },
  icon: {
    color: "white", // Set your desired icon color
    fontSize: 24, // Set your desired icon size
    color: Colors.darker,
    fontWeight: "800",
  },
  sectionTab: {
    width: width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  sectionContainer: {
    // padding: 16,
    borderRadius: 8,
    width: width * 0.28,
    height: width * 0.28,
    backgroundColor: Colors.third,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer_select: {
    padding: 16,
    borderRadius: 8,
    width: width * 0.28,
    height: width * 0.28,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  meal_icon: {
    width: 40,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.darker,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: Colors.primary,

    paddingVertical: 8,
    paddingHorizontal: 12, // Adjusted padding
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    textAlign:'center',
    fontWeight: "bold",
    color: Colors.primary_3
  },
  calories: {
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: Colors.primary,
    display: "flex",
    paddingHorizontal: 12,
    paddingVertical: 24,
    justifyContent: "space-around",
    flexDirection: "row",
    borderRadius: 15,
    height: width * 0.28,
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  calories_text_head: {
    color: Colors.primary_3,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  calories_text: {
    //color: "#FFF",
    color: Colors.primary_3,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    textTransform: "uppercase",
  },
  // section_icon: {
  //   color: Colors.red,
  //   padding: 15,
  //   backgroundColor: Colors.third,
  //   alignSelf: "center",
  //   borderRadius: 10,
  //   width: width * 0.3,
  //   height: width * 0.3,
  // },
  food_container: {
    flex: 1,
    marginHorizontal: 16,
    width: width - 32,
    marginVertical: 16,
  },
});
