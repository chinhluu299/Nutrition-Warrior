import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Dimensions } from "react-native";
import PieChart from "react-native-pie-chart";
import { Colors } from "../resources/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProgressKcal = ({ target, current }) => {
  const data = {
    labels: ["Kcal"], // optional parseFloat(target) == 0 ? 1 : parseFloat(current) / parseFloat(target)
    data: target == 0 ? [1] : [(current/target)],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 1,
    //  color: (opacity = 1) => `rgba(57, 184, 120, 0.7)`,
    color: (opacity = 1) => `rgba(0,162,153,0.6)`,
  };

  const chartConfig2 = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 1,
    //  color: (opacity = 1) => `rgba(57, 184, 120, 0.7)`,
    color: (opacity = 1) => `rgba(255,69,0,1)`,
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        style={styles.chart}
        data={data}
        width={160}
        height={160}
        strokeWidth={16}
        radius={71.9}
        chartConfig={target - current >= 0 ? chartConfig : chartConfig2}
        hideLegend={true}
      ></ProgressChart>
      <View style={styles.content}>
        <Text style={styles.content_number}>
          {Math.abs((target - current).toFixed(2))}
        </Text>
        <Text style={styles.content_text}>{target - current >= 0 ? "Kcal Left" : "Excess Kcal"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    position: "absolute",
    borderRadius: 80,
  },
  content: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  content_number: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text,
  },
  content_text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.5,
  },
});

export default ProgressKcal;
