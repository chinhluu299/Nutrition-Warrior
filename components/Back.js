import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const Back = ({backEvent}) => {
  return (
    <TouchableOpacity style={styles.back_control} onPress={backEvent}>
      <Ionicons name="arrow-back" style={styles.back_control_icon} />
    </TouchableOpacity>
  );  
}
const styles = StyleSheet.create({
  back_control: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 50,
    left: 20,
    borderWidth: 0,
  },
  back_control_icon: {
    fontSize: 20,
    fontWeight: "800",
  },
});
export default Back;