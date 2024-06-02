import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import LottieView from "lottie-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { styles } from "./style";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import exerciseApi from "../../api/exerciseApi";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ExerciseInputModal from "../../components/ExerciseInputModal";
import * as Speech from "expo-speech";

const DoExerciseScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  const [content, setContent] = useState(data);
  const [sets, setSets] = useState([]);
  const [selected, setSelected] = useState(0);
  const [setSelect, setSetSelect] = useState(0);
  const [infoModalVisible, setInfoModalVisible] = useState("");
  const [started, setStarted] = useState(false);
  const [reps, setReps] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    console.log("Qua man hinh")
    setContent(data);
    setSelected(0);
    const current = data[0];
    setSets(current.sets);
  }, []);

  useEffect(() => {
    const current = content[selected];
    setSets(current.sets);
    setSetSelect(0);
  }, [selected]);

  const triggerConfetti = () => {
    
    confettiRef.current?.reset();
    confettiRef.current?.play();
  }
  const countDownSecond = () => {
    clearInterval(intervalId);
    setIntervalId(
      setInterval(() => {
        setSeconds((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalId); // Dừng đồng hồ đếm khi thời gian kết thúc
            return 0;
          }
        });
      }, 1000)
    );
  };

  const speak = async () => {};
  const startHandler = () => {
    setStarted(true);
    setSeconds(sets[setSelect].duration);
    setReps(sets[setSelect].reps);
    countDownSecond();

  };
  const nextHandler = () => {
    if (setSelect < sets.length - 1) {
      setSetSelect(setSelect + 1);
      setStarted(false);
    }
    else if (selected < data.length - 1) {
      setSelected(selected + 1);
      setStarted(false);
    } else{
      //congratulation
      setCompleted(true);
      setTimeout(() => {
        triggerConfetti();
      }, 1000); 
    }
     
  };
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={infoModalVisible} animationType="fade">
        <Pressable
          style={styles.modalContainer}
          onPress={() => setInfoModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.content_info}>
              <Text style={styles.content_info_title}>Target: </Text>
              <Text style={styles.content_info_value}>
                {content[selected].exercise_data.target}
              </Text>
            </View>
            <View style={styles.content_info}>
              <Text style={styles.content_info_title}>Target body part: </Text>
              <Text style={styles.content_info_value}>
                {content[selected].exercise_data.bodyPart}
              </Text>
            </View>
            <View style={styles.content_info}>
              <Text style={styles.content_info_title}>Equipment: </Text>
              <Text style={styles.content_info_value}>
                {content[selected].exercise_data.equipment}
              </Text>
            </View>
            <View style={styles.content_info}>
              <Text style={styles.content_info_title}>Secondary Muscles: </Text>
              <Text style={styles.content_info_value}>
                {content[selected].exercise_data.secondaryMuscles &&
                  content[selected].exercise_data.secondaryMuscles.map((v, i) =>
                    i < content[selected].exercise_data.length - 1
                      ? v + ", "
                      : v
                  )}
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.back_control}
          onPress={(e) => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" style={styles.back_control_icon} />
        </TouchableOpacity>
        <Text style={styles.background_title_text}>{content.name}</Text>
        <TouchableOpacity
          style={styles.info_control}
          onPress={(e) => {
            setInfoModalVisible(true);
          }}
        >
          <Ionicons name="information" style={styles.info_control_icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.image_container}>
        <Image
          style={styles.image}
          source={{ uri: content[selected].exercise_data.gifUrl }}
          resizeMode="contain"
        />
      </View>
      {!started ? (
        <TouchableOpacity style={styles.floatingButton} onPress={startHandler}>
          {/* <Ionicons name="add" style={styles.floatingButtonIcon} /> */}
          <Text style={styles.floatingButtonIcon}>Start</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={styles.container_counting}>
            <View style={styles.container_counting_item}>
              <FontAwesome5
                style={[
                  styles.container_counting_item_icon,
                  { color: "white" },
                ]}
                name="dumbbell"
              />
              <Text
                style={[
                  styles.container_counting_item_text,
                  { color: "white" },
                ]}
              >
                {reps}
              </Text>
              <Text
                style={[
                  styles.container_counting_item_text_2,
                  { color: "white" },
                ]}
              >
                reps
              </Text>
            </View>
            <View style={styles.container_counting_item_2}>
              <FontAwesome5
                style={styles.container_counting_item_icon}
                name="clock"
              />
              <Text style={styles.container_counting_item_text}>{seconds}</Text>
              <Text style={styles.container_counting_item_text_2}>seconds</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={nextHandler}>
            {/* <Ionicons name="add" style={styles.floatingButtonIcon} /> */}
            <Text style={styles.nextButtonIcon}>Next</Text>
            <MaterialIcons style={styles.nextButtonIcon} name="navigate-next" />
          </TouchableOpacity>
        </View>
      )}
      {completed && <View></View>}
      <LottieView
        ref={confettiRef}
        source={require("../../assets/congrat2.json")}
        autoPlay
        loop
        style={styles.lottie}
        //resizeMode="cover"
        onAnimationFinish={() => console.log("Animation Finished!")}
        onAnimationLoaded={() => console.log("Animation Loaded!")}
      />
      <Button
        title="Play Animation"
        onPress={() => confettiRef.current.play()}
      />
      <Button
        title="Reset Animation"
        onPress={() => confettiRef.current.reset()}
      />
      <Toast position="bottom" bottomOffset={30} />
    </View>
  );
};

export default DoExerciseScreen;
