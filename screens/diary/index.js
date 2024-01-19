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
      const logDate = new Date(log.date);
      return (
        logDate.getDate() === selectedDate.getDate() &&
        logDate.getMonth() === selectedDate.getMonth() &&
        logDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    setFoodItems(selectedDayLog ? selectedDayLog.foods : []);
  };

  useEffect(() => {
    fetchData();
    console.log(userData);
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

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Breakfast</Text>
          {foodItems &&
          foodItems.breakfast &&
          foodItems.breakfast.length > 0 ? (
            foodItems.breakfast.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text>{food.name}</Text>
                <Text>{food.nutrients.ENERC_KCAL} kcal</Text>
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
                <Text>{food.name}</Text>
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
                <Text>{food.name}</Text>
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
      </ScrollView>

      {isLoading && <ActivityIndicatorLoadingPage />}

      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

export default DiaryScreen;
