import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Colors } from "../../resources/Colors";
import Toast from "react-native-toast-message";
import authApi from "../../api/authApi";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
//import { useNavigation } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAccept, setIsAccept] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  //const navigation = useNavigation();

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

  const toLogin = () => {
    navigation.navigate("Login", {}, { reset: true });
  };
  const submitHandler = async () => {
    if (!isAccept) {
      Toast.show({
        type: "info",
        text1: "Confirm you agree to our Terms and Conditions",
      });
      return;
    }
    if (
      email.length < 1 ||
      !isValidEmail ||
      fullName.length < 1 ||
      phoneNumber.length < 1 ||
      password.length < 1
    ) {
      Toast.show({
        type: "info",
        text1: "Please check your information",
      });
      return;
    }

    try {
      setIsBusy(true);
      var res = await authApi.register({
        name: fullName,
        phone_number: phoneNumber,
        email: email,
        password: password,
      });
      if (res.status == 201) {
        Toast.show({
          type: "success",
          text1: "Sign up successfully!",
        });

        setEmail("");
        setFullName("");
        setIsValidEmail(true);
        setPassword("");
        setPhoneNumber("");

        setTimeout(() => {
          navigation.navigate("Login", {}, { reset: true });
        }, 2500);
      } else {
        Toast.show({
          type: "error",
          text1: "Sign up failed!",
        });
      }
      setIsBusy(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setIsBusy(false);
    }
  };
  const checkEmailIsValid = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeout = setTimeout(() => {
      checkEmailIsValid(text);
    }, 1000);

    setTimeoutId(newTimeout);
  };
  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title_main}>Get Started</Text>
          <Text style={styles.title_extra}>by creating a free account</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.content_input}>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full name"
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="account-outline"
              />
            </View>
            <View
              style={[
                styles.input_control,
                !isValidEmail && { borderColor: "red", borderWidth: 1 },
              ]}
            >
              <TextInput
                style={styles.input_text}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Valid email"
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="email-outline"
              />
            </View>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone number"
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="phone-outline"
              />
            </View>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                placeholder="Strong password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="lock-outline"
              />
            </View>
            <View style={styles.input_option}>
              <Checkbox
                value={isAccept}
                onValueChange={(newValue) => setIsAccept(newValue)}
                color={isAccept ? Colors.primary : undefined}
                style={styles.checkbox_remmeber_me}
              />
              <Text style={styles.text_remember_me}>
                By checking the box you agree to our{" "}
                <Text style={{ color: Colors.secondary }}>Terms</Text> and{" "}
                <Text style={{ color: Colors.secondary }}>Conditions</Text>.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button_submit}
            onPress={(e) => submitHandler()}
          >
            <Text style={styles.button_submit_text}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <Text style={styles.register_text_1}>Already a member?</Text>
            <Text style={styles.register_text_2} onPress={(e) => toLogin()}>
              Login
            </Text>
          </View>
        </View>
        <Toast position="top" topOffset={30} />
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
      </View>
    );
  } else {
    return "";
  }
};

export default RegisterScreen;
