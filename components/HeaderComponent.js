import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HeaderComponent = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.back_control}
        onPress={(e) => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" style={styles.back_control_icon} />
      </TouchableOpacity>
      <Text style={styles.background_title_text}>{title}</Text>
    </View>
  );
};

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

export default HeaderComponent;
