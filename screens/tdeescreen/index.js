import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "./style";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

const TdeeScreen = ({ route }) => {
  const { data, tdee } = route.params;
  const navigation = useNavigation();
  const [tdeeEdit, setTdeeEdit] = useState(tdee);
  const [isEdit, setIsEdit] = useState(false);
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
  const HandleContinue = async () => {
    navigation.navigate(
      "Macro",
      {
        data: data,
        tdee: isEdit == true ? tdeeEdit : tdee,
      },
      { reset: true }
    );
  };
  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image_background}
          source={require("../../assets/dtee.png")}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.heading}>Total Daily Energy Expenditure</Text>
          {isEdit == false ? (
            <View>
              <Text style={styles.heading_name}>{tdee.toFixed(2)}</Text>
              <Text
                style={styles.description}
                onPress={(e) => setIsEdit(!isEdit)}
              >
                Do you want to enter a different number?
              </Text>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.text_input}
                value={tdeeEdit}
                keyboardType="numeric"
                onChange={(text) => setTdeeEdit(parseFloat(text))}
              />
              <Text
                style={styles.description}
                onPress={(e) => setIsEdit(!isEdit)}
              >
                CANCEL
              </Text>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity style={styles.button_next} onPress={HandleContinue}>
            <Text style={styles.text_next}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default TdeeScreen;
