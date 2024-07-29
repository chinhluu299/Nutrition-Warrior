import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { Colors } from "../resources/Colors";

const widthScreen = Dimensions.get("window").width;

export const ProgressKcalItem = ({ title, target, current }) => {
  const progress =
    parseFloat(target) === 0 ? 1 : parseFloat(current) / parseFloat(target);
  const isOverGoal = parseFloat(current) > parseFloat(target);
  const left = (parseFloat(target) - parseFloat(current)).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Progress.Bar
        progress={isOverGoal ? 1 : progress}
        width={widthScreen / 6}
        backgroundColor={Colors.background}
        borderWidth={0}
        color={isOverGoal ? Colors.error : Colors.primary}
        height={3}
        style={styles.progress_bar}
      />
      <View style={styles.detailContainer}>
        <Text style={[styles.detail, isOverGoal && styles.overGoal]}>
          {isOverGoal ? `${Math.abs(left)}g over` : `${left}g left`}
        </Text>
        <Text style={styles.goalText}>
          {`${parseFloat(current).toFixed(1)}/${parseFloat(target).toFixed(
            1
          )}g`}
        </Text>
      </View>
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
  },
  detailContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  detail: {
    fontWeight: "600",
    opacity: 0.6,
  },
  overGoal: {
    color: Colors.error,
  },
  goalText: {
    fontSize: 12,
    opacity: 0.4,
    marginTop: 2,
  },
});

export default ProgressKcalItem;
