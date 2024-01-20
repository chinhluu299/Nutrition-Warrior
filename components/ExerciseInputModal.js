import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import exerciseApi from "../api/exerciseApi";
import Toast from "react-native-toast-message";

const ExerciseInputModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch();
  const [exerciseSets, setExerciseSets] = useState([
    { id: 1, reps: "8", duration: "0" },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: exerciseSets.length + 1,
      reps: "8",
      duration: "0",
    };
    setExerciseSets([...exerciseSets, newRow]);
  };

  const userId = useSelector((state) => state.rootReducer.user.id);

  const handleAddExercise = async () => {
    try {
      const exerciseData = {
        exercise_data: data,
        sets: exerciseSets.map((set) => ({
          reps: set.reps,
          duration: set.duration,
        })),
      };
      console.log(userId);
      console.log(exerciseData);

      const response = await exerciseApi.addExerciseToDailyLog(
        userId,
        exerciseData
      );
      if (response.data.success) {
        dispatch({
          type: "UPDATE_USER_DAILY_LOG",
          payload: response.data.data.daily_logs,
        });
      }
      Toast.show({
        type: response.data.success ? "success" : "error",
        text1: response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      console.error("Error while adding exercise:", error.message);
    }
  };

  const styles = {
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "80%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    addButton: {
      backgroundColor: "#3498db",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    addButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    closeButton: {
      marginTop: 10,
      alignItems: "center",
    },
    closeButtonText: {
      color: "#3498db",
      fontWeight: "bold",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    rowInput: {
      flex: 1,
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginHorizontal: 5,
      padding: 10,
    },
    addRowButton: {
      backgroundColor: "#27ae60",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    addRowButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Exercise Set</Text>
          <ScrollView>
            {exerciseSets.map((row) => (
              <View key={row.id} style={styles.rowContainer}>
                <Text>{row.id}</Text>
                <TextInput
                  style={styles.rowInput}
                  placeholder="Reps"
                  keyboardType="numeric"
                  value={row.reps}
                  onChangeText={(text) => {
                    const updatedSets = [...exerciseSets];
                    updatedSets.find((r) => r.id === row.id).reps = text;
                    setExerciseSets(updatedSets);
                  }}
                />
                <TextInput
                  style={styles.rowInput}
                  placeholder="Duration (seconds)"
                  keyboardType="numeric"
                  value={row.duration}
                  onChangeText={(text) => {
                    const updatedSets = [...exerciseSets];
                    updatedSets.find((r) => r.id === row.id).duration = text;
                    setExerciseSets(updatedSets);
                  }}
                />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.addRowButton} onPress={handleAddRow}>
            <Text style={styles.addRowButtonText}>Add Row</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExercise}
          >
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseInputModal;
