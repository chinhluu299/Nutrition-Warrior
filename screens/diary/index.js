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

const DiaryScreen = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    setShowDatePicker(Platform.OS === "ios"); // Close the picker on iOS
    if (newDate !== undefined) {
      setSelectedDate(newDate);
      // Add logic to fetch data for the selected date
      // You can call your API or update state accordingly
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await exerciseApi.fetchDataForDate(selectedDate);
      setExerciseData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Ionicons name="chevron-back" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text
            style={{ color: Colors.darker, fontWeight: "800", fontSize: 18 }}
          >
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextDay}>
          <Ionicons name="chevron-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <ScrollView style={{ flex: 1 }}>
        {/* Breakfast Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Breakfast</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
          {/* Add Breakfast content here */}
        </View>

        {/* Lunch Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lunch</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
          {/* Add Lunch content here */}
        </View>

        {/* Dinner Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dinner</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
          {/* Add Dinner content here */}
        </View>

        {/* Snacks Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Snacks</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity>
          {/* Add Snacks content here */}
        </View>
      </ScrollView>
      {/* Loading indicator */}
      {isLoading && <ActivityIndicatorLoadingPage />}

      {/* Rest of your DiaryScreen content */}
      <View style={{ flex: 1 }}>
        {exerciseData && (
          // Render your exercise data here using exerciseData
          <Text>{exerciseData}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiaryScreen;
