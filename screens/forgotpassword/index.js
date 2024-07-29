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
import axios from "axios";

const ForgotPasswordScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(120);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    setSeconds(120);
    clearInterval(intervalId);

    setIntervalId(
      setInterval(() => {
        setSeconds((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalId); // Dừng đồng hồ đếm khi thời gian kết thúc
            return 0;
          }
        });
      }, 1000)
    );
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

  const resendOtp = async () => {
    try {
      const res = await authApi.sendOtp({
        email: email,
      });
      if (res.status == 200) {
        countDown();
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
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
  const toLogin = () => {
    navigation.navigate("Login", {}, { reset: true });
  };
  const submitHandle = async () => {
    if (step == 2) {
      await confirmOtpHandle();
    } else if (step == 3) {
      try {
        const res = await authApi.changePassword({
          email: email,
          password: password
        });
        if (res.status == 200) {
          Toast.show({
            type: "success",
            text1: "Reset successfully!",
          });
          setTimeout(() => {
            navigation.navigate("Login", {}, { reset: true });
          }, 1000);
        } else {
          Toast.show({
            type: "error",
            text1: res.data.message,
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
    }
  };

  const sendOtpHandle = async () => {
    setIsBusy(true);
    // setStep(2);
    // countDown();
    try {
      const res = await authApi.sendOtp({
        email: email,
      });
      if (res.status == 200) {
        setStep(2);
        countDown();
      } else {
        Toast.show({
          type: "error",
          text1: res.data.message,
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

  const confirmOtpHandle = async () => {
    if (otp1 && otp2 && otp3 && otp4 && otp5) {
      try {
        const res = await authApi.confirmOtp({
          email: email,
          otp: otp1 + otp2 + otp3 + otp4 + otp5,
        });
        if (res.status == 200) {
          setStep(3);
        } else {
          Toast.show({
            type: "error",
            text1: res.data.message,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  };

  const handleOtpTextChange = (text, nextInputRef) => {
    if (text.length > 0) {
      nextInputRef.current.focus();
    }
  };
  if (fontLoaded) {
    return step == 1 ? (
      <View style={styles.container}>
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
            onPress={async (e) => await sendOtpHandle()}
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
    ) : step == 2 ? (
      <View style={styles.container}>
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
        <View style={styles.header}>
          <Text style={styles.title_main}>Forgot password</Text>
          <Text style={styles.title_extra}>Provide your account's email</Text>
        </View>
        <View style={styles.content_2}>
          <View style={styles.otp_container}>
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
                value={otp2}
                onChangeText={(text) => {
                  setOtp2(text.slice(-1));
                  handleOtpTextChange(text, inputRef3);
                }}
              />
            </View>
            <View style={styles.otp}>
              <TextInput
                ref={inputRef3}
                value={otp3}
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
                value={otp4}
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
                value={otp5}
                style={styles.otp_number}
                onChangeText={(text) => {
                  setOtp5(text.slice(-1));
                  handleOtpTextChange(text, inputRef5);
                }}
              />
            </View>
          </View>
          <View>
            <Text>
              The OTP code will expire in {seconds} seconds.{" "}
              <Text style={styles.resend} onPress={resendOtp}>
                Resend
              </Text>
            </Text>
          </View>
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
    ) : (
      <View style={styles.container}>
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
        <View style={styles.header}>
          <Text style={styles.title_main}>Reset password</Text>
          <Text style={styles.title_extra}>Provide your new password</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.content_input}>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                placeholder="Enter new password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.input_control}>
              <TextInput
                style={styles.input_text}
                placeholder="Confirm your password"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>
          </View>
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
        <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
        <Toast position="top" topOffset={30} />
      </View>
    );
  } else {
    return "";
  }
};

export default ForgotPasswordScreen;
