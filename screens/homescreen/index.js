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
import { useNavigation } from "@react-navigation/native";
import { current } from "@reduxjs/toolkit";
import foodApi from "../../api/foodApi";
import { format } from "date-fns";
const foodExample = {
  idMeal: "52822",
  strMeal: "Toad In The Hole",
  strDrinkAlternate: null,
  strCategory: "Pork",
  strArea: "British",
  strInstructions:
    "Preheat the oven to 200°C/fan180°C/gas 6. fry sausages in a non-stick pan until browned.\r\nDrizzle vegetable oil in a 30cm x 25cm x 6cm deep roasting tray and heat in the oven for 5 minutes.\r\nPut the plain flour in a bowl, crack in the medium free-range eggs, then stir in the grated horseradish. Gradually beat in the semi-skimmed milk. Season.\r\nPut the sausages into the hot roasting tray and pour over the batter. Top with cherry tomatoes on the vine and cook for 30 minutes until puffed and golden.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/ytuvwr1503070420.jpg",
  strTags: null,
  strYoutube: "https://www.youtube.com/watch?v=t1dWkDrC330",
  strIngredient1: "sausages",
  strIngredient2: "vegetable oil",
  strIngredient3: "plain flour",
  strIngredient4: "eggs",
  strIngredient5: "horseradish",
  strIngredient6: "milk",
  strIngredient7: "cherry tomatoes",
  strIngredient8: "",
  strIngredient9: "",
  strIngredient10: "",
  strIngredient11: "",
  strIngredient12: "",
  strIngredient13: "",
  strIngredient14: "",
  strIngredient15: "",
  strIngredient16: "",
  strIngredient17: "",
  strIngredient18: "",
  strIngredient19: "",
  strIngredient20: "",
  strMeasure1: "8",
  strMeasure2: "3 tbsp",
  strMeasure3: "100g",
  strMeasure4: "2 medium",
  strMeasure5: "1 tbsp grated",
  strMeasure6: "225ml",
  strMeasure7: "200g",
  strMeasure8: "",
  strMeasure9: "",
  strMeasure10: "",
  strMeasure11: "",
  strMeasure12: "",
  strMeasure13: "",
  strMeasure14: "",
  strMeasure15: "",
  strMeasure16: "",
  strMeasure17: "",
  strMeasure18: "",
  strMeasure19: "",
  strMeasure20: "",
  strSource:
    "http://www.deliciousmagazine.co.uk/recipes/georgina-fuggles-horseradish-and-vine-tomato-toad-in-the-hole/",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};
const HomeScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const userInfo = useSelector((state) => state.rootReducer.user);
  const goToRecipe = () => {
    navigation.navigate("Recipe", {data: dailyPick}, { reset: true });
  }
  const navigation = useNavigation();
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
  const [currentDaily, setCurrentDaily] = useState();
  const [dailyPick, setDailyPick] = useState({});

  const fetchRandomFood = async () => {
    try {
      const response = await foodApi.randomFood();
      if(response.status == 200){
        const data = response.data;
        console.log(data)
        setDailyPick(data);
      }
    } catch (err) {
      
    }
  };
  useEffect(() => { fetchRandomFood() },[]);
  useEffect(() => {
    setUser(userInfo);
    if (userInfo) {
      const logs = userInfo.daily_logs;

      const selectedDateFirst10 = format(new Date(), "yyyy-MM-dd");
      const selectedDayLog = logs.find((log) => {
        const logDateFirst10 = log.date.substring(0, 10);
        // Compare using string representation
        return logDateFirst10 === selectedDateFirst10;
      });
      
      if (selectedDayLog) setCurrentDaily(selectedDayLog);
      else setCurrentDaily(null);
    }
    loadFonts();
  }, [userInfo]);

  const goToActivity = () => {
    navigation.navigate("Exercise", { reset: true });
  };
  const goToFood = () => {
    navigation.navigate("Search", { reset: true });
  };
  if (fontLoaded && user) {
    return (
      <View style={styles.background}>
        <View style={styles.timestamp}>
          <Text style={styles.timestamp_text}>TODAY</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.daily_kcal_left}>
            <ProgressKcal
              target={user.caloric_intake_goal}
              current={currentDaily != null ? currentDaily.caloric_intake : 0}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.daily_kcal_left_detail}>
              <ProgressKcalItem
                title={"Fat"}
                target={user.daily_fat_goal}
                current={currentDaily != null ? currentDaily.fat_intake : 0}
              />
              <ProgressKcalItem
                title={"Carbs"}
                target={user.daily_carb_goal}
                current={currentDaily != null ? currentDaily.carb_intake : 0}
              />
              <ProgressKcalItem
                title={"Protein"}
                target={user.daily_protein_goal}
                current={currentDaily != null ? currentDaily.protein_intake : 0}
              />
            </View>
            <View style={styles.daily_action}>
              <TouchableOpacity
                style={styles.daily_action_item}
                onPress={goToFood}
              >
                <MaterialCommunityIcons
                  size={50}
                  name="food-fork-drink"
                  color={Colors.pie_color4}
                />
                <Text style={styles.daily_action_text}>ADD FOOD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.daily_action_item}
                onPress={goToActivity}
              >
                <MaterialCommunityIcons
                  size={50}
                  name="run-fast"
                  color={Colors.pie_color5}
                />
                <Text style={styles.daily_action_text}>ADD ACTIVITY</Text>
              </TouchableOpacity>
              
            </View>
            <TouchableOpacity style={styles.daily_pick} onPress={goToRecipe}>
              <DailyPickCard
                image={dailyPick.strMealThumb}
                title={dailyPick.strMeal}
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
