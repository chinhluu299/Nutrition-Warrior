import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    top: 50,
    right: 20,
    //backgroundColor: Colors.dark,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    zIndex: 10,
    //opacity: 0.8,
  },
  floatingButtonIcon: {
    fontSize: 20,
    //color: "#FFF",
    color: Colors.primary_3,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },

  searchInput: {
    flex: 1,
    height: 40,
    borderColor: Colors.primary_2,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  searchButton: {
    position: "absolute",
    right: 20,
  },

  searchButtonText: {
    color: "#000",
    fontSize: 40,
  },
  container: {
    flex: 1,
  },

  background_title_text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 30,
    color: Colors.primary_3,
    fontWeight: "700",
  },
  list: {
    flex: 1,
  },
  circle_1: {
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: -width + 100,
    right: width / 2,
    zIndex: -1,
  },
  circle_2: {
    width: 200,
    height: 200,
    borderRadius: 100,
    top: height / 2,
    left: width / 2 + 100,
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: -1,
  },
  circle_3: {
    width: 300,
    height: 300,
    borderRadius: 150,
    bottom: -100,
    left: -100,
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem: {
    padding: 16,
    width: 0.45 * width,
    alignItems: "center",
  },
  tabItemSelected: {
    padding: 16,
    width: 0.45 * width,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: Colors.primary
  },
  floatingButton_2: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary_2,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  floatingButtonIcon_2: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "600",
  },
  floatingButtonText_2:{
    color: "#FFF",
    marginLeft:5,
    fontSize: 16,
    fontWeight: "600",
  }
});
