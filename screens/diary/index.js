import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import { Colors } from "../../resources/Colors";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const DiaryScreen = ({ route }) => {
  const [caloriesRemain, setCaloriesRemain] = useState(0);
  const [caloriesIntake, setCaloriesIntake] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const navigation = useNavigation();

  const handleExerciseItemPress = (exerciseEntry) => {
    navigation.navigate(
      "ExerciseDetail",
      { data: exerciseEntry },
      { reset: true }
    );
  };
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
    const selectedDateFirst10 = format(selectedDate, "yyyy-MM-dd");

    const selectedDayLog = dailyLogs.find((log) => {
      const logDateFirst10 = log.date.substring(0, 10);
      // Compare using string representation
      return logDateFirst10 === selectedDateFirst10;
    });

    setCaloriesIntake(selectedDayLog ? selectedDayLog.caloric_intake : 0);
    console.log(userData);
    setCaloriesRemain(
      selectedDayLog
        ? Math.floor(selectedDayLog.caloric_remain)
        : Math.floor(userData.caloric_intake_goal)
    );
    setExerciseData(selectedDayLog ? selectedDayLog.exercise_data : []);
    setFoodItems(selectedDayLog ? selectedDayLog : []);
  };

  useEffect(() => {
    fetchData();
    // console.log(userData);
  }, [selectedDate, userData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Ionicons name="chevron-back" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text
            style={{
              color: Colors.primary_2,
              fontWeight: "800",
              fontSize: 18,
            }}
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
      <View style={styles.calories}>
        <View>
          <Text style={styles.calories_text_head}>{caloriesIntake}</Text>
          <Text style={styles.calories_text}>Calories Intake</Text>
        </View>
        <View>
          <Text style={styles.calories_text_head}>{caloriesRemain}</Text>
          <Text style={styles.calories_text}>Calories Remaining</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          <MaterialIcons
            name="free-breakfast"
            size={35}
            style={styles.section_icon}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Breakfast</Text>
            </View>
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
          </View>

          {/* <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.sectionContainer}>
          <MaterialIcons
            name="lunch-dining"
            size={35}
            style={styles.section_icon}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Lunch</Text>
            </View>

            {foodItems && foodItems.lunch && foodItems.lunch.length > 0 ? (
              foodItems.lunch.map((food, index) => (
                <View key={index} style={styles.foodItem}>
                  <Text style={styles.foodLabel}>{food.label}</Text>
                  <Text>{food.nutrients.ENERC_KCAL} kcal</Text>
                </View>
              ))
            ) : (
              <Text>No lunch items</Text>
            )}
          </View>

          {/* <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.sectionContainer}>
          <MaterialCommunityIcons
            name="food-apple"
            size={35}
            style={styles.section_icon}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Dinner</Text>
            </View>

            {foodItems && foodItems.dinner && foodItems.dinner.length > 0 ? (
              foodItems.dinner.map((food, index) => (
                <View key={index} style={styles.foodItem}>
                  <Text style={styles.foodLabel}>{food.label}</Text>
                  <Text>{food.nutrients.ENERC_KCAL} kcal</Text>
                </View>
              ))
            ) : (
              <Text>No dinner items</Text>
            )}
          </View>

          {/* <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add Food</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* <View style={styles.sectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <FontAwesome5
              name="dumbbell"
              size={24}
              style={{ marginLeft: 10, color: Colors.primary }}
            />
          </View>
          {exerciseData && exerciseData.length > 0 ? (
            exerciseData.map((exerciseEntry, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exerciseItemContainer}
                onPress={() => handleExerciseItemPress(exerciseEntry.exercise)}
              >
                <Text style={styles.exerciseName}>
                  {exerciseEntry.exercise.name.charAt(0).toUpperCase() +
                    exerciseEntry.exercise.name.slice(1)}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {exerciseEntry.sets.map((set, setIndex) => (
                    <View key={setIndex} style={styles.setContainer}>
                      <Text style={styles.setInfo}>Set {setIndex + 1}</Text>
                      <Table
                        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
                      >
                        <Row
                          data={["Reps", "Duration"]}
                          style={styles.tableHeader}
                          textStyle={styles.tableHeaderText}
                        />
                        <Rows
                          data={[[set.reps, `${set.duration} seconds`]]}
                          textStyle={styles.tableRowText}
                        />
                      </Table>
                    </View>
                  ))}
                </ScrollView>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noItemsText}>No exercises available</Text>
          )}
        </View> */}

      {isLoading && <ActivityIndicatorLoadingPage />}

      {/* <View style={{ flex: 1 }}></View> */}
    </SafeAreaView>
  );
};

export default DiaryScreen;
