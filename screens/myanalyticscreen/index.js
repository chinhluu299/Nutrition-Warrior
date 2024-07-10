import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./style";
import * as Font from "expo-font";
import KcalPieChart from "../../components/KcalPieChart";
import { useSelector } from "react-redux";
import { lastSixMonths, thisMonth, thisWeek, thisYear } from "../../utils/dateUtils";
import Back from "../../components/Back";
import { useNavigation } from "@react-navigation/native";

const MyAnalyticsScreen = () => {
  const userInfo = useSelector((state) => state.rootReducer.user);
  const [breakfast, setBreakfast] = useState(0);
  const [dinner, setDinner] = useState(0);
  const [lunch, setLunch] = useState(0);
  const navigation = useNavigation();

  const [timestamp, setTimestamp] = useState("today");
  const [fontLoaded, setFontLoaded] = useState(false);
  const options = [
    { key: "today", value: "Today" },
    { key: "this-week", value: "This week" },
    { key: "last-month", value: "Last month" },
    { key: "six-month", value: "6 months" },
    { key: "one-year", value: "1 year" },
  ];
  const handleAnalytics = () => {
    var minDate = new Date();
    switch (timestamp) {
      case "today":
        break;
      case "this-week":
        minDate = thisWeek();
        break;
      case "last-month":
        minDate = thisMonth();
        break;
      case "six-month":
        minDate = lastSixMonths();
        break;
      case "one-year":
        minDate = thisYear();
        break;
      default:
        break;
    }
    handleAnalyticSelection(minDate);
    console.log(minDate)
  }
  const handleAnalyticSelection = (minDate) => {
    const dailogs = userInfo.daily_logs.filter(x => new Date(x.date) > minDate);
    let countDate = 0;
    let avgBreakfast = 0;
    let avgLunch = 0;
    let avgDinner = 0;

    dailogs.forEach(element => {
      countDate++;
      element.breakfast.forEach(breakfast => {
        avgBreakfast += breakfast.nutrients.ENERC_KCAL;
      })
      element.lunch.forEach((lunch) => {
        avgLunch += lunch.nutrients.ENERC_KCAL;
      });
      element.dinner.forEach((dinner) => {
        avgDinner += dinner.nutrients.ENERC_KCAL;
      });
    });
    setBreakfast(Math.floor(avgBreakfast/ (countDate || 1)));
    setLunch(Math.floor(avgLunch / (countDate || 1)));
    setDinner(Math.floor(avgDinner / (countDate || 1)));

  }
  useEffect(()=> {
    handleAnalytics();
  },[timestamp])
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
  useEffect(() => {
    loadFonts();
  }, []);
  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.background_title}>
          <Text style={styles.background_title_text}>MY ANALYTICS</Text>
        </View>
        <View style={styles.timestamp}>
          <ScrollView
            style={styles.timestamp_scroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {options.map((element) => (
              <TouchableOpacity
                key={element.key}
                onPress={() => setTimestamp(element.key)}
                style={[
                  styles.timestamp_element,
                  element.key === timestamp && styles.timestamp_element_active,
                ]}
              >
                <Text style={styles.timestamp_text}>{element.value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <KcalPieChart breakfast={breakfast} lunch={lunch} dinner={dinner} />
        </View>
        <Back backEvent={() => navigation.goBack()} />
      </View>
    );
  } else {
    return "";
  }
};

export default MyAnalyticsScreen;
