import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  TextInput,
} from "react-native";
import { styles } from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import ActivityIndicatorLoadingPage from "../../components/ActivityIndicatorLoadingPage";
import macroApi from "../../api/macroApi";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Colors } from "../../resources/Colors";
import { useDispatch } from "react-redux";
import store from "../../app/store";

const MacroScreen = ({ route }) => {
  const { data, tdee } = route.params;
  const surveys_1 = [
    {
      type: 1,
      question: "Daily protein / Kg ?(g)",
      range: [1.8, 2.7],
    },
    {
      type: 2,
      question: "Deficit Percentage ?(%)",
      range: [5, 15],
    },
  ];
  const surveys_2 = [
    {
      type: 1,
      question: "Daily protein / Kg ?(g)",
      range: [1.6, 2.2],
    },
    {
      type: 3,
      question: "Surplus Percentage ?(%)",
      range: [5, 15],
    },
  ];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  const [proteinPerKg, setProteinPerKg] = useState(0);
  const [deficitPercent, setDeficitPercent] = useState(0);
  const [surplusPercent, setSurplusPercent] = useState(0);
  const [proteinForOverWeight, setProteinForOverWeight] = useState(0);
  const [dailyFat, setDailyFat] = useState(0);
  const [value, setValue] = useState(-1);

  const [surveys, setSurveys] = useState([]);

  const [isBusy, setIsBusy] = useState(false);

  const setStateReturn = (value) => {
    switch (step) {
      case 1:
        setProteinPerKg(value);
        break;
      case 2:
        setDeficitPercent(value);
        break;
      case 3:
        setSurplusPercent(value);
        break;
      case 4:
        setProteinForOverWeight(value);
        break;
      case 5:
        setDailyFat(value);
        break;
      default:
        break;
    }
  };
  // {
  //   type: 4,
  //   question: "Protein For OverWeight ?(g)",
  //   range: [10, 200],
  // },
  useEffect(() => {
    if (data.goal == "Lose Fat") {
      if (data.overweight == "Yes")
        setSurveys([
          ...surveys_1,
          {
            type: 4,
            question: "Protein For OverWeight ?(g)",
            range: [10, 200],
          },
          {
            type: 5,
            question: "Daily Fat ?(%)",
            range: [20, 30],
          },
        ]);
      else
        setSurveys([
          ...surveys_1,
          {
            type: 5,
            question: "Daily Fat ?(%)",
            range: [20, 30],
          },
        ]);
    } else {
      if (data.overweight == "Yes")
        setSurveys([
          ...surveys_2,
          {
            type: 4,
            question: "Protein For OverWeight ?(g)",
            range: [10, 200],
          },
          {
            type: 5,
            question: "Daily Fat ?(%)",
            range: [20, 30],
          },
        ]);
      else
        setSurveys([
          ...surveys_2,
          {
            type: 5,
            question: "Daily Fat ?(%)",
            range: [20, 30],
          },
        ]);
    }
  }, []);

  const NextQuestionHandle = async () => {
    if (step < surveys.length - 1 && value > -1) {
      setStep(step + 1);
      setValue(-1);
    } else {
      CalculateMacro();
    }
  };
  const UpdateUser = async (value) => {
    setIsBusy(true);
    try {
      const res = await macroApi.updateMacro(
        {
          tdee: tdee,
          goal: data.goal,
          caloric_intake_goal: value.caloric_intake_goal,
          daily_protein_goal: value.daily_protein_goal,
          daily_fat_goal: value.daily_fat_goal,
          daily_carb_goal: value.daily_carb_goal,
        },
        store.getState().rootReducer.user.id
      );
      if (res.status == 200) {
        setIsBusy(false);
        Toast.show({
          text1: "Expenditure updated successfully",
          type: "success",
        });
        dispatch({
          type: "UPDATE_USER_MACRO",
          payload: {
            tdee: tdee,
            goal: data.goal,
            caloric_intake_goal: value.caloric_intake_goal,
            daily_protein_goal: value.daily_protein_goal,
            daily_fat_goal: value.daily_fat_goal,
            daily_carb_goal: value.daily_carb_goal,
            first_login: true,
          },
        });
        navigation.navigate("MainScreen", {}, { reset: false });
      } else {
        Toast.show({
          type: "error",
          text1: "Can not calculate Macro",
        });
        setIsBusy(false);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      console.log(error);
      setIsBusy(false);
    }
  };
  const CalculateMacro = async () => {
    setIsBusy(true);
    try {
      const res = await macroApi.getMacro({
        goal: data.goal,
        height: data.height,
        weight: data.weight,
        overweight: data.overweight == "Yes" ? true : false,
        daily_protein_ker_kg: proteinPerKg,
        daily_protein_for_overweight_people: proteinForOverWeight,
        deficit_percentage: deficitPercent,
        surplus_percentage: surplusPercent,
        daily_fat_percentage: dailyFat,
        tdee: tdee,
      });
      // console.log(res);
      if (res.status == 200) {
        const value = res.data;
        if (value) {
          await UpdateUser(value);
          //update user
          //65a1853d8019b802626d5de7
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Can not calculate Macro",
        });
        setIsBusy(false);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      console.log(error);
      setIsBusy(false);
    }
  };
  const PreviousQuestionHandle = async () => {
    if (step > 0) {
      setStep(step - 1);
      setValue(-1);
    }
  };
  const ChangeSelection = (value, index) => {
    setStateReturn(value);
  };
  return (
    <View style={styles.container}>
      <ActivityIndicatorLoadingPage type={1} isBusy={isBusy} />

      <View style={styles.questions}>
        {surveys.map((value, index) => {
          if (step == index) {
            return <View key={index} style={styles.step_active}></View>;
          } else {
            return <View key={index} style={styles.step_nonactive}></View>;
          }
        })}
      </View>
      <Toast position="top" topOffset={30} style={{ zIndex: 1000 }} />
      <View style={styles.question_detail}>
        {surveys.length > 0 && (
          <View>
            <Text style={styles.question_detail_question}>
              {surveys[step].question}
            </Text>
            <View style={styles.result}>
              <Text style={styles.value}>{value.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={surveys[step].range[0]}
                maximumValue={surveys[step].range[1]}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.light_gray_2}
                value={value}
                onValueChange={(value) => {
                  setValue(value);
                  setStateReturn(value);
                }}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.back_button}
          onPress={PreviousQuestionHandle}
        >
          <MaterialCommunityIcons
            style={styles.back_button_icon}
            color={"#FFFFFF"}
            name="arrow-left"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next_button}
          onPress={NextQuestionHandle}
        >
          <Text style={styles.next_step}>Next</Text>
          <MaterialCommunityIcons
            style={styles.back_button_icon}
            color={"#FFFFFF"}
            name="arrow-right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MacroScreen;
