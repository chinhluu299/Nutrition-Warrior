import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import Instructor from "../../components/Instructor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { Colors } from "../../resources/Colors";
import { useNavigation } from "@react-navigation/native";

const EmptyScreen = () => {
  const navigation = useNavigation();
  const image = require("../../assets/instructor/present-unscreen.gif")
  const contents = ["Hey, I'm Chinh. I am your instructor.", "Let's me give you some instructions"]
  const [status, setStatus] = useState("");
  const logOut = async () => {
    dispatch({
      type: "LOGOUT",
    });
    dispatch({
      type: "CLEAR_USER",
    });
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };
  return (
    <View style={styles.container}>
      {/* <Instructor image={image} contents={contents} setStatus={setStatus}
      status={status}/> */}
      <View style={styles.daily_action}>
        <TouchableOpacity
          style={styles.daily_action_item}
          onPress={() => {
            navigation.navigate("MessageScreen");
          }}
        >
          <MaterialCommunityIcons
            size={50}
            name="message"
            color={Colors.pie_color5}
          />
          <Text style={styles.daily_action_text}>Advice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.daily_action_item}
          onPress={() => {
            navigation.navigate("MealAnalyzeScreen");
          }}
        >
          <MaterialCommunityIcons
            size={50}
            name="food"
            color={Colors.pie_color5}
          />
          <Text style={styles.daily_action_text}>Analyze Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.daily_action_item}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <MaterialCommunityIcons
            size={50}
            name="account"
            color={Colors.pie_color5}
          />
          <Text style={styles.daily_action_text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.daily_action_item} onPress={logOut}>
          <MaterialCommunityIcons
            size={50}
            name="logout"
            color={Colors.pie_color5}
          />
          <Text style={styles.daily_action_text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyScreen;
