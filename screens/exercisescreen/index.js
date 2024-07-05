import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./style";
import { ExerciseColletionsBodyPart } from "../../static/ExerciseCollections";
import ExerciseCollectionItem from "../../components/ExerciseCollectionItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import exerciseApi from "../../api/exerciseApi";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Back from "../../components/Back";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ExerciseCompact from "../../components/ExerciseCompact";

const ExerciseScreen = () => {
  const isFocused = useIsFocused();
  const data = ExerciseColletionsBodyPart;
  const [myEx, setMyEx] = useState([]);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);

  const handleStartPractice = () => {
    navigation.navigate("DoExercise", { data: myEx, reset: true });
  };

  const handleSearch = async () => {
    setIsBusy(true);
    setModalVisible(false);
    try {
      console.log("====================================");
      console.log(searchText);
      console.log("====================================");

      const response = await exerciseApi.getExercisesByName(searchText);
      if (response.data.success && response.data.data.length > 0) {
        // console.log(response.data.data);
        setFilteredData(response.data.data);
        setSearch(true);
      } else {
        setSearch(false);
        setFilteredData([]);
        Toast.show({
          type: "info",
          text1: "Not found",
        });
      }
    } catch (error) {
      setFilteredData([]);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }

    setIsBusy(false);
  };
  const onPressExCompact = (data) => {
    navigation.navigate(
      "ExerciseDetail",
      { data: data.exercise },
      { reset: true }
    );
  };
  const daiLog = useSelector((state) => state.rootReducer.user.daily_logs);
  const daiLogTest = [
    {
      exercise_data: {
        bodyPart: "back",
        equipment: "cable",
        gifUrl: "https://v2.exercisedb.io/image/I4XMjCBFhqaGoJ",
        id: "0007",
        instructions: [
          "Sit on the cable machine with your back straight and feet flat on the ground.",
          "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
          "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
          "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
          "Repeat for the desired number of repetitions.",
        ],
        name: "alternate lateral pulldown",
        secondaryMuscles: ["biceps", "rhomboids"],
        target: "lats",
      },
      sets: [
        {
          reps: 10,
          duration: 30,
        },
        {
          reps: 8,
          duration: 30,
        },
      ],
    },
    {
      exercise_data: {
        bodyPart: "back",
        equipment: "leverage machine",
        gifUrl: "https://v2.exercisedb.io/image/Js4jXbAEKYW8jz",
        id: "0015",
        instructions: [
          "Adjust the machine to your desired weight and height.",
          "Place your hands on the parallel bars with a close grip, palms facing each other.",
          "Hang from the bars with your arms fully extended and your feet off the ground.",
          "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
          "Continue pulling until your chin is above the bars.",
          "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
          "Repeat for the desired number of repetitions.",
        ],
        name: "assisted parallel close grip pull-up",
        secondaryMuscles: ["biceps", "forearms"],
        target: "lats",
      },
      sets: [
        {
          reps: 8,
          duration: 40,
        },
        {
          reps: 6,
          duration: 60,
        },
      ],
    },
  ];
  useEffect(() => {
    //co the phan thanh nhieu loai
    const selectedDayLog = daiLog.find((log) => {
      const logDateFirst10 = log.date.substring(0, 10);
      const selectedDateFirst10 = new Date().toISOString().substring(0, 10);
      if (logDateFirst10 === selectedDateFirst10) {
        console.log("====================================");
        console.log("equal");
        console.log("====================================");
      }
      return logDateFirst10 === selectedDateFirst10;
    });
    if (selectedDayLog) setMyEx(selectedDayLog.exercise_data);
    else setMyEx(null);
  }, [isFocused]);

  const onPressHandleSearchItem = (item) => {
    navigation.navigate("ExerciseDetail", { data: item }, { reset: true });
  };
  const onPressHandle = (title) => {
    navigation.navigate("ExerciseList", { title: title }, { reset: true });
  };
  const handlePress = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <Pressable style={styles.modalContainer} onPress={handlePress}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.background_title_text}>Search</Text> */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search exercises..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <Ionicons
                  style={styles.searchButtonText}
                  name="search-circle"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(true);
          setSearchText("");
        }}
      >
        <Ionicons name="search" style={styles.floatingButtonIcon} />
      </TouchableOpacity>
      {search ? (
        <Back backEvent={() => setSearch(false)} />
      ) : (
        <Back backEvent={() => navigation.goBack()} />
      )}

      <Text style={styles.background_title_text}>
        {search ? "SEARCH EX" : "EXERCISES"}
      </Text>
      {/* <View style={styles.circle_1}></View>
      <View style={styles.circle_2}></View>
      <View style={styles.circle_3}></View> */}

      {filteredData.length > 0 && search ? (
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExerciseCollectionItem
              image={{ uri: item.gifUrl }}
              title={item.name}
              type={2}
              press={() => onPressHandleSearchItem(item)}
            />
          )}
        />
      ) : (
        <View style={styles.list}>
          <View style={styles.tab}>
            <Pressable
              onPress={() => setTabSelected(0)}
              style={
                tabSelected === 0 ? styles.tabItemSelected : styles.tabItem
              }
            >
              <Text style={tabSelected === 0 && { fontWeight: "600" }}>
                Exercises
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTabSelected(1)}
              style={
                tabSelected === 1 ? styles.tabItemSelected : styles.tabItem
              }
            >
              <Text style={tabSelected === 1 && { fontWeight: "600" }}>
                My List
              </Text>
            </Pressable>
          </View>
          {tabSelected === 0 ? (
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ExerciseCollectionItem
                  image={item.image}
                  title={item.title}
                  press={() => onPressHandle(item.title)}
                />
              )}
            />
          ) : (
            <FlatList
              style={styles.list}
              data={myEx}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ExerciseCompact
                  image={{ uri: item.exercise.gifUrl }}
                  title={item.exercise.name}
                  sets={item.sets}
                  press={() => onPressExCompact(item)}
                />
              )}
            />
          )}
          {tabSelected === 1 && (
            <TouchableOpacity
              style={styles.floatingButton_2}
              onPress={handleStartPractice}
            >
              <MaterialCommunityIcons
                name="weight-lifter"
                style={styles.floatingButtonIcon_2}
              />
              <Text style={styles.floatingButtonText_2}>Time to start</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <Toast position="top" topOffset={30} style={{ zIndex: 1000 }} />
    </View>
  );
};

export default ExerciseScreen;
