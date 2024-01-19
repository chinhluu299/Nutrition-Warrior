import React, { useState, useEffect, useId } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import ProgressKcal from "../../components/ProgressKcal";
import ProgressKcalItem from "../../components/ProgressKcalItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../resources/Colors";
import DailyPickCard from "../../components/DailyPickCard";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const userInfo = useSelector((state) => state.rootReducer.user);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
      "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
      "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
      "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
      "Inter-ExtraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
      "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
      "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
      "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
      "Inter-Thin": require("../../assets/fonts/Inter-Thin.ttf"),
    });
    setFontLoaded(true);
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userInfo);
    loadFonts();
  }, []);
  if (fontLoaded && user) {
    return (
      <View style={styles.background}>
        <View style={styles.timestamp}>
          <Text style={styles.timestamp_text}>TODAY</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.daily_kcal_left}>
            <ProgressKcal target={1700} current={1000} />
          </View>
          <View style={styles.content}>
            <View style={styles.daily_kcal_left_detail}>
              <ProgressKcalItem
                title={"Fat"}
                target={user.daily_logs[0].daily_fat_goal}
                current={user.daily_logs[0].fat_remain}
              />
              <ProgressKcalItem
                title={"Carbs"}
                target={user.daily_logs[0].daily_carb_goal}
                current={user.daily_logs[0].carb_remain}
              />
              <ProgressKcalItem
                title={"Protein"}
                target={user.daily_logs[0].daily_protein_goal}
                current={user.daily_logs[0].protein_remain}
              />
            </View>
            <View style={styles.daily_action}>
              <TouchableOpacity style={styles.daily_action_item}>
                <MaterialCommunityIcons
                  size={50}
                  name="food-fork-drink"
                  color={Colors.pie_color4}
                />
                <Text style={styles.daily_action_text}>ADD FOOD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.daily_action_item}>
                <MaterialCommunityIcons
                  size={50}
                  name="weight-lifter"
                  color={Colors.pie_color5}
                />
                <Text style={styles.daily_action_text}>ADD ACTIVITY</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.daily_pick}>
              <DailyPickCard
                title="Oatmeal with flaxseed and berries"
                kcal={320}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default HomeScreen;
