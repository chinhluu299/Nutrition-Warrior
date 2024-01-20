import React, { useState } from "react";
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

const SurveyScreen = () => {
  // const [surveys, setSurveys] = useState([]);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [inputValue, setInputValue] = useState(0);

  const [sex, setSex] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [active, setActive] = useState("");
  const [overweight, setOverWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [isBusy, setIsBusy] = useState(false);

  const handleChange = (text) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
    setStateReturn(parseInt(text));
  };

  const setStateReturn = (value) => {
    switch (step) {
      case 0:
        setSex(value);
        break;
      case 1:
        setHeight(value);
        break;
      case 2:
        setWeight(value);
        break;
      case 3:
        setActive(value);
        break;
      case 4:
        setOverWeight(value);
        break;
      case 5:
        setGoal(value);
        break;
      default:
        break;
    }
  };
  const surveys = [
    {
      question: "What is your sex?",
      answer: ["Male", "Female"],
    },
    {
      question: "What is your height?",
      answer: [""],
      unit: "cm",
    },
    {
      question: "What is your weight?",
      answer: [""],
      unit: "kg",
    },
    {
      question: "How active are you?",
      answer: ["Less Active", "Not Sure", "More Active"],
    },
    {
      question: "Are you overweight?",
      answer: ["Yes", "No"],
    },
    {
      question: "What is your goal?",
      answer: ["Lose Fat", "Gain Muscle", "Maintain"],
    },
    // {
    //   question: "How much protein per kilogram of body weight for daily?",
    //   answer: [""],
    //   unit: "gram",
    // },
  ];
  const NextQuestionHandle = () => {
    if (step < surveys.length - 1) {
      if (
        selected >= 0 ||
        (surveys[step].unit != null && inputValue.length > 0)
      ) {
        setStep(step + 1);
        setSelected(-1);
        setInputValue("");
      }
    } else {
      CalculateTdee();
      //navigation.navigate("Home");
    }
  };
  const CalculateTdee = async () => {
    setIsBusy(true);
    try {
      const res = await macroApi.getTdeeMethod1({
        gender: sex,
        height: height,
        weight: weight,
        activity_level: active,
      });
      if (res.status == 200) {
        const data = res.data;
        setIsBusy(false);

        if (data) {
          navigation.navigate(
            "Tdee",
            {
              data: {
                gender: sex,
                height: height,
                weight: weight,
                activity_level: active,
                overweight: overweight,
                goal: goal,
              },
              tdee: data.tdee,
            },
            { reset: true }
          );
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Can not calculate TDEE",
        });
        setIsBusy(false);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setIsBusy(false);
    }
  };
  const PreviousQuestionHandle = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(-1);
      setInputValue("");
    }
  };
  const ChangeSelection = (value, index) => {
    setSelected(index);
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
        {
          <View>
            <Text style={styles.question_detail_question}>
              {surveys[step].question}
            </Text>
            <View>
              {surveys[step].answer.length > 1 ? (
                surveys[step].answer.map((value, index) => (
                  <TouchableOpacity
                    key={step + "_" + index}
                    style={
                      selected == index
                        ? styles.question_detail_choose_active
                        : styles.question_detail_choose
                    }
                    onPress={() => ChangeSelection(value, index)}
                  >
                    <Text>{value}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <TextInput
                  style={styles.question_detail_input}
                  value={inputValue}
                  onChangeText={handleChange}
                  keyboardType="numeric"
                  placeholder={"Enter a number ( " + surveys[step].unit + " )"}
                />
              )}
            </View>
          </View>
        }
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

export default SurveyScreen;
