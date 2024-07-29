import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import feedbackApi from "../../api/feedbackApi";

const screenWidth = Dimensions.get("window").width;

const FeedbackScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.rootReducer.user.id);

  useEffect(() => {
    // axios
    //   .get(
    //     `https://17d3-171-250-122-141.ngrok-free.app/api/analysis/analyze/${userId}`
    //   )
    //   .then((response) => {
    //     setData(response.data.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //   });
    feedbackApi
      .getFeedback(userId)
      .then((response) => {
        const sortedLogs = response.data.data.logs.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData({ ...response.data.data, logs: sortedLogs });
        console.log("kkk: ", response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#rgba(0,162,153,0.6)" />
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const calorieChartData = {
    labels: data.logs.map((log) => log.date.split("T")[0].slice(-5)),
    datasets: [
      {
        data: data.logs.map((log) => log.caloric_intake),
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const weightChartData = {
    labels: data.logs.map((log) => log.date.split("T")[0].slice(-5)),
    datasets: [
      {
        data: data.logs.map((log) => log.weight || 70),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {data.logs.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Fitness Feedback</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weight Progress</Text>
            {/* <Text style={styles.cardContent}>{data.weight_progress}</Text> */}
            <View style={styles.chartContainer}>
              <LineChart
                data={weightChartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                }}
                bezier
                style={styles.chart}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calorie Intake Over Time</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={calorieChartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Average Daily Intake</Text>
            <View style={styles.intakeContainer}>
              {Object.entries(data.advice.average_intake).map(
                ([key, value]) => (
                  <View key={key} style={styles.intakeItem}>
                    <Text style={styles.intakeLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <Text style={styles.intakeValue}>
                      {value.toFixed(2)} {key === "calories" ? "kcal" : "g"}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Analysis</Text>
            <Text style={styles.cardContent}>{data.advice.analysis}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Advice</Text>
            <Text style={styles.cardContent}>{data.advice.advice}</Text>
          </View>
        </ScrollView>
      ) : (
        <Text>No data available </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "rgba(0,162,153,0.6)",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  intakeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  intakeItem: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
  },
  intakeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  intakeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default FeedbackScreen;
