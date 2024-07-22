import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import exerciseApi from "../api/exerciseApi";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../resources/Colors";

const ExerciseInputModal = ({ visible, onClose, data, setVisible }) => {
  const dispatch = useDispatch();

  const [exerciseSets, setExerciseSets] = useState([
    { id: 1, reps: "8", duration: "30" },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: exerciseSets.length + 1,
      reps: "8",
      duration: "30",
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
        console.log("===================dsadfasdf=================");
        console.log(response.data.data);
        console.log("====================================");
        dispatch({
          type: "UPDATE_USER",
          payload: response.data.data,
        });
      }
      Toast.show({
        type: response.data.success ? "success" : "error",
        text1: response.data.message,
        visibilityTime: 3000,
        autoHide: true,
      });
      setVisible(false);
    } catch (error) {
      console.error("Error while adding exercise:", error.message);
    }
  };

  const styles = StyleSheet.create({
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
      width: "90%",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: Colors.primary_3,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    addButton: {
      backgroundColor: Colors.secondary_2,
      padding: 10,
      marginBottom: 5,
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
      //color: "#3498db",
      color: "#000",
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
      //backgroundColor: "#27ae60",
      backgroundColor:  Colors.primary,
      padding: 10,
      marginBottom: 5,
      alignItems: "center",
      marginTop: 20,
    },
    addRowButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    icon: {
      fontSize: 16,
      color: Colors.primary_2,
      verticalAlign: "middle",
    },
  });

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Exercise</Text>
          <ScrollView>
            {exerciseSets.map((row) => (
              <View key={row.id} style={styles.rowContainer}>
                {/* 
                <Text>{row.id}</Text> */}
                <FontAwesome5 name="dumbbell" style={styles.icon} />
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
                <FontAwesome5 name="clock" style={styles.icon} />
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
            <Text style={styles.addRowButtonText}>Add Set</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExercise}
          >
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setExerciseSets([{ id: 1, reps: "8", duration: "30" }]);
              return onClose();
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast position="top" topOffset={30} style={{ zIndex: 1000 }} />
    </Modal>
  );
};

export default ExerciseInputModal;
