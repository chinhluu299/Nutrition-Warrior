import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "../resources/Colors";

const widthScreen = Dimensions.get("window").width;
const heightSreen = Dimensions.get("window").height;

export const ProgressKcalItem = ({ title, target, current }) => {
  //   const [targetNum, setTargetNum] = useState(0);
  //   const [currentNum, setCurrentNum] = useState(0);
  //   const [left, setLeft] = useState(0);

  //   useEffect(() => {
  //     setTargetNum(parseFloat(target).toFixed(1));
  //     setCurrentNum(parseFloat(current).toFixed(1));
  //   }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Progress.Bar
        progress={
          parseFloat(target) == 0 ? 1 : parseFloat(current) / parseFloat(target)
        }
        width={widthScreen / 6}
        backgroundColor={Colors.background}
        borderWidth={0}
        color={Colors.secondary}
        height={3}
        style={styles.progress_bar}
      />
      <Text style={styles.detail}>
        {(parseFloat(target) - parseFloat(current)).toFixed(1) < 0
          ? 0
          : (parseFloat(target) - parseFloat(current)).toFixed(1)}
        g left
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary_3,
  },
  progress_bar: {
    marginTop: 5,
    //color: Colors.primary
  },
  detail: {
    marginTop: 5,
    fontWeight: "600",
    opacity: 0.4,
  },
});

export default ProgressKcalItem;
