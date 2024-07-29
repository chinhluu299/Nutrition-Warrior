import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questions: {
    width: width - 32,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
    marginTop: 20,
  },
  step_active: {
    backgroundColor: Colors.primary,
    height: 5,
    flex: 1,
    borderRadius: 50,
    margin: 4,
  },
  step_nonactive: {
    backgroundColor: Colors.black,
    height: 5,
    flex: 1,
    opacity: 0.15,
    borderRadius: 50,
    margin: 4,
  },
  question_detail: {
    flex: 1,
    margin: 20,
    marginTop: 0,
  },
  question_detail_question: {
    fontSize: 24,
    marginBottom: 10,
  },
  result: {
    marginTop: 40,
  },
  value: {
    fontSize: 46,
    textAlign: "center",
    color: Colors.secondary_2,
    fontWeight: "600",
  },
  value_container: {
    backgroundColor:Colors.third,
    marginBottom: 10,
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf:'center',
  },
  slider_container:{
    marginBottom: 10,
  },
  
  description: {
    fontSize: 16,
    color: "gray",
    lineHeight: 30,
    textAlign: "justify",
    padding: 15,
    backgroundColor:Colors.third,
    borderRadius:10,
  },
  question_detail_choose: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: Colors.light_gray,
    borderRadius: 5,
  },
  question_detail_choose_active: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  question_detail_input: {
    height: 50,
    width: width - 40,
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: Colors.light_gray,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    bottom: 0,
    alignItems: "center",
  },
  back_button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 59,
    opacity: 0.8,
    backgroundColor: Colors.primary_2,
  },
  back_button_icon: {
    fontSize: 20,
  },
  next_button: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    opacity: 0.8,
    backgroundColor: Colors.primary_2,
    borderRadius: 50,
  },
  next_step: {
    color: "#FFFFFF",
    marginRight: 5,
  },
});
