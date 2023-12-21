import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import * as Font from "expo-font";

const SplashScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
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
  const OnNextStep = () => {
    navigation.navigate("Survey");
  };
  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image_background}
          source={require("../../assets/splash2.jpg")}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.heading}>Welcome to</Text>
          <Text style={styles.heading_name}>Nutrition Warrior</Text>
          <Text style={styles.description}>Welcome to Nutrition Warrior</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button_next} onPress={OnNextStep}>
            <Text style={styles.text_next}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default SplashScreen;
