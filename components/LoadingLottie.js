import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { View, Text, Dimensions } from "react-native";
import { Colors } from "../resources/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoadingLottie = ({ isBusy }) => {
  const confettiRef = useRef(null);
  const triggerConfetti = () => {
    confettiRef.current?.reset();
    confettiRef.current?.play();
  };
  useEffect(()=> {
    if(isBusy)
      triggerConfetti();
  },[isBusy])
  return (
    isBusy && (
      <View style={[styles.container]}>
        {/* <View style={styles.background}></View> */}
        <LottieView
          ref={confettiRef}
          source={require("../assets/loading.json")}
          loop={true}
          style={styles.lottie}
          resizeMode="cover"
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    zIndex: 10000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  background: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "black",
    opacity: 0.75,
    flex: 1,
  },
  lottie: {
  width: 200,
  height:200
  },
});

export default LoadingLottie;
