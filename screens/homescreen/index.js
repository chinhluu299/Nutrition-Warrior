import React, {useState, useEffect} from "react";
import * as Font from 'expo-font';
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import ProgressKcal from "../../components/ProgressKcal";
import ProgressKcalItem from "../../components/ProgressKcalItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../resources/Colors";
import DailyPickCard from "../../components/DailyPickCard";

const HomeScreen = () => {
    const [fontLoaded,setFontLoaded] = useState(false);
    const loadFonts = async () => {
        await Font.loadAsync({
          'Inter-SemiBold': require("../../assets/fonts/Inter-SemiBold.ttf"),
          'Inter-Black': require("../../assets/fonts/Inter-Black.ttf"),
          'Inter-Bold': require("../../assets/fonts/Inter-Bold.ttf"),
          'Inter-ExtraBold': require("../../assets/fonts/Inter-ExtraBold.ttf"),
          'Inter-ExtraLight': require("../../assets/fonts/Inter-ExtraLight.ttf"),
          'Inter-Light': require("../../assets/fonts/Inter-Light.ttf"),
          'Inter-Medium': require("../../assets/fonts/Inter-Medium.ttf"),
          'Inter-Regular': require("../../assets/fonts/Inter-Regular.ttf"),
          'Inter-Thin': require("../../assets/fonts/Inter-Thin.ttf"),
        });
        setFontLoaded(true);
      };
    useEffect(()=> {
          loadFonts();
      },[])
    if(fontLoaded){
        return (
            <View style={styles.background}>
              <View style={styles.timestamp}>
                <Text style={styles.timestamp_text}>TODAY</Text>
              </View>
              <View style={styles.container}>
                <View style={styles.daily_kcal_left}>
                  <ProgressKcal target={1700} current={1000}/>
                </View>
                <View style={styles.content}>
                  <View style={styles.daily_kcal_left_detail}>
                    <ProgressKcalItem title={"Fat"} target={100} current={50}/>
                    <ProgressKcalItem title={"Carbs"} target={100} current={60}/>
                    <ProgressKcalItem title={"Protein"} target={100} current={10}/>
                  </View>
                  <View style={styles.daily_action}>
                    <TouchableOpacity style={styles.daily_action_item}>
                      <MaterialCommunityIcons size={50} name="food-fork-drink" color={Colors.pie_color4} />
                      <Text style={styles.daily_action_text}>ADD FOOD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.daily_action_item}>
                      <MaterialCommunityIcons size={50} name="weight-lifter" color={Colors.pie_color5} />
                      <Text style={styles.daily_action_text}>ADD ACTIVITY</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.daily_pick}>  
                    <DailyPickCard title="Oatmeal with flaxseed and berries" kcal={320}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }else{
        return "";
    }
}

export default HomeScreen;