import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import { Colors } from "../../resources/Colors";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const DiaryScreen = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const userData = useSelector((state) => state.rootReducer.user);
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handleDateChange = (event, newDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (newDate !== undefined) {
      setSelectedDate(newDate);
    }
  };

  const fetchData = () => {
    const dailyLogs = userData.daily_logs;

    const selectedDayLog = dailyLogs.find((log) => {
      const logDateFirst10 = log.date.substring(0, 10);
      const selectedDateFirst10 = selectedDate.toISOString().substring(0, 10);
      if (logDateFirst10 === selectedDateFirst10) {
        console.log("====================================");
        console.log("equal");
        console.log("====================================");
      }
      // Compare using string representation
      return logDateFirst10 === selectedDateFirst10;
      // if (logDate === selectedDate) {
      //   console.log("====================================");
      //   console.log(true);
      //   console.log("====================================");
      // }
      // return (
      //   logDate.getDate() === selectedDate.getDate() &&
      //   logDate.getMonth() === selectedDate.getMonth() &&
      //   logDate.getFullYear() === selectedDate.getFullYear()
      // );
    });
    console.log(selectedDayLog);

    setExerciseData(selectedDayLog ? selectedDayLog.exercise_data : []);
    setFoodItems(selectedDayLog ? selectedDayLog : []);
    console.log(selectedDayLog.breakfast.length);
  };

  useEffect(() => {
    fetchData();
    // console.log(userData);
  }, [selectedDate, userData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Ionicons name="chevron-back" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text
            style={{ color: Colors.darker, fontWeight: "800", fontSize: 18 }}
          >
            {format(selectedDate, "MMMM d, yyyy")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextDay}>
          <Ionicons name="chevron-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <ScrollView style={{ flex: 1.5 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Breakfast</Text>
          {foodItems &&
          foodItems.breakfast &&
          foodItems.breakfast.length > 0 ? (
            foodItems.breakfast.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodLabel}>{food.label}</Text>
                <Text style={styles.foodDetails}>
                  {food.nutrients.ENERC_KCAL} kcal
                </Text>
              </View>
            ))
          ) : (
            <Text>No breakfast items</Text>
          )}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lunch</Text>

          {foodItems && foodItems.lunch && foodItems.lunch.length > 0 ? (
            foodItems.lunch.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text>{food.label}</Text>
                <Text>{food.nutrients.ENERC_KCAL} kcal</Text>
              </View>
            ))
          ) : (
            <Text>No lunch items</Text>
          )}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dinner</Text>

          {foodItems && foodItems.dinner && foodItems.dinner.length > 0 ? (
            foodItems.dinner.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text>{food.label}</Text>
                <Text>{food.nutrients.ENERC_KCAL} kcal</Text>
              </View>
            ))
          ) : (
            <Text>No dinner items</Text>
          )}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {exerciseData && exerciseData.length > 0 ? (
            exerciseData.map((exerciseEntry, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>
                  {exerciseEntry.exercise.name}
                </Text>

                {/* Display details for each set */}
                {exerciseEntry.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setContainer}>
                    <Text style={styles.setInfo}>Set {setIndex + 1}</Text>
                    <Text style={styles.setInfo}>Reps: {set.reps}</Text>
                    <Text style={styles.setInfo}>
                      Duration: {set.duration} seconds
                    </Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text style={styles.noExercisesText}>No exercises available</Text>
          )}
        </View>
      </ScrollView>

      {isLoading && <ActivityIndicatorLoadingPage />}

      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

export default DiaryScreen;
