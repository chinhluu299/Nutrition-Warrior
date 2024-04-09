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

const MyAnalyticsScreen = () => {
  const [timestamp, setTimestamp] = useState("today");
  const [fontLoaded, setFontLoaded] = useState(false);
  const options = [
    { key: "today", value: "Today" },
    { key: "this-week", value: "This week" },
    { key: "last-month", value: "Last month" },
    { key: "six-month", value: "6 months" },
    { key: "one-year", value: "1 year" },
  ];
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
          <KcalPieChart breakfast={100} lunch={200} dinner={150} />
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default MyAnalyticsScreen;
