import React, { useState, useEffect, useReducer, useRef } from "react";
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

const ForgotPasswordScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");

  const navigation = useNavigation();

  const countDown = () => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
  };

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
  const toLogin = () => {
    navigation.navigate("Login", {}, { reset: true });
  };
  const submitHandle = () => {
    setStep(2);
  };
  const handleOtpTextChange = (text, nextInputRef) => {
    if (text.length > 0) {
      nextInputRef.current.focus();
    }
  };
  if (fontLoaded) {
    return step == 1 ? (
      <View style={styles.container}>
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
        <View style={styles.header}>
          <Text style={styles.title_main}>Forgot password</Text>
          <Text style={styles.title_extra}>Provide your account's email</Text>
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
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button_submit}
            onPress={async (e) => await submitHandle()}
          >
            <Text style={styles.button_submit_text}>SEND</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <Text style={styles.register_text_1}>Back to</Text>
            <Text style={styles.register_text_2} onPress={(e) => toLogin()}>
              Login
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
        <View style={styles.header}>
          <Text style={styles.title_main}>Forgot password</Text>
          <Text style={styles.title_extra}>Provide your account's email</Text>
        </View>
        <View style={styles.content_2}>
          <View style={styles.otp}>
            <TextInput
              ref={inputRef1}
              value={otp1}
              style={styles.otp_number}
              onChangeText={(text) => {
                setOtp1(text.slice(-1));
                handleOtpTextChange(text, inputRef2);
              }}
            />
          </View>
          <View style={styles.otp}>
            <TextInput
              ref={inputRef2}
              style={styles.otp_number}
              onChangeText={(text) => {
                setOtp2(text.slice(-1));
                handleOtpTextChange(text, inputRef3);
              }}
            />
          </View>
          <View style={styles.otp}>
            <TextInput
              ref={inputRef3}
              style={styles.otp_number}
              onChangeText={(text) => {
                setOtp3(text.slice(-1));
                handleOtpTextChange(text, inputRef4);
              }}
            />
          </View>
          <View style={styles.otp}>
            <TextInput
              ref={inputRef4}
              style={styles.otp_number}
              onChangeText={(text) => {
                setOtp4(text.slice(-1));
                handleOtpTextChange(text, inputRef5);
              }}
            />
          </View>
          <View style={styles.otp}>
            <TextInput
              ref={inputRef5}
              style={styles.otp_number}
              onChangeText={(text) => {
                setOtp5(text.slice(-1));
                handleOtpTextChange(text, inputRef5);
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.otp}>
            The OTP code will expire in {seconds} seconds.{" "}
            <Text style={styles.resend} onPress={resendOtp}>
              Resend
            </Text>
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button_submit}
            onPress={async (e) => await submitHandle()}
          >
            <Text style={styles.button_submit_text}>SUBMIT</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <Text style={styles.register_text_1}>Back to</Text>
            <Text style={styles.register_text_2} onPress={(e) => toLogin()}>
              Login
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return "";
  }
};

export default ForgotPasswordScreen;
