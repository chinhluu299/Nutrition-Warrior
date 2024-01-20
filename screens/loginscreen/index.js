import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { styles } from "./style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Colors } from "../../resources/Colors";
import authApi from "../../api/authApi";
import Toast from "react-native-toast-message";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const dispatch = useDispatch();

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
  useEffect(() => {
    loadFonts();
  }, []);
  const submitHandle = async (e) => {
    if (email.length < 1 || !isValidEmail || password.length < 1) {
      Toast.show({
        type: "info",
        text1: "Please check your email and password",
      });
      return;
    }
    try {
      setIsBusy(true);
      var res = await authApi.login({
        email: email,
        password: password,
      });

      if (res.status == 200) {
        //save state
        setIsBusy(false);
        if (res.data.success) {
          dispatch({
            type: "UPDATE_USER",
            payload: res.data.data,
          });
          if (res.data.data.first_login != null) {
            navigation.navigate("MainScreen", {}, { reset: true });
          } else {
            navigation.navigate("Survey", {}, { reset: true });
          }
        }
        return;
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
        });
        setIsBusy(false);
      }
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
  const goRegister = () => {
    navigation.navigate("Register", {}, { reset: true });
  };
  const goForgotPassword = () => {
    navigation.navigate("ForgotPassword", {}, { reset: true });
  };
  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
        <View style={styles.header}>
          <Text style={styles.title_main}>Welcome back</Text>
          <Text style={styles.title_extra}>Sign in to access your account</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.content_input}>
            <View
              style={[
                styles.input_control,
                !isValidEmail && { borderColor: "red", borderWidth: 1 },
              ]}
            >
              <TextInput
                style={styles.input_text}
                placeholder="Enter your email"
                value={email}
                onChangeText={handleEmailChange}
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="email-outline"
              />
            </View>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <MaterialCommunityIcons
                style={styles.input_icon}
                name="lock-outline"
              />
            </View>
            <View style={styles.input_option}>
              <View style={styles.input_remember_me}>
                <Checkbox
                  value={isRemember}
                  onValueChange={(newValue) => setIsRemember(newValue)}
                  color={isRemember ? Colors.primary : undefined}
                  style={styles.checkbox_remmeber_me}
                />
                <Text style={styles.text_remember_me}>Remember me</Text>
              </View>
              <View>
                <Text
                  style={styles.text_forgot_password}
                  onPress={goForgotPassword}
                >
                  Forgot password ?
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button_submit}
            onPress={async (e) => await submitHandle()}
          >
            <Text style={styles.button_submit_text}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <Text style={styles.register_text_1}>New Member?</Text>
            <Text style={styles.register_text_2} onPress={(e) => goRegister()}>
              Register now
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default LoginScreen;
